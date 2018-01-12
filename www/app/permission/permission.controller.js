
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, $ionicPopup,NetworkInformation, PermissionService) {
        var vm = this;

        vm.isLate = true;
        vm.isOffice = true;
        vm.userInfo = JSON.parse(localStorage.getItem("authDetails"));
        vm.time = vm.userInfo.custom_fields;
        vm.isTimeValid = true;
        vm.isMinutesValid = true;
        vm.isPermissionValid = true;
        vm.wifilist = [];
        vm.currentWifi = "";
        vm.authdata = {
            "headers": {
                "Authorization": "",
            }
        }

        angular.forEach(vm.time, function (element) {
            if (element.name == "Office Start Time") {
                vm.officeTime = element;
            }
        })
        
        vm.convertTime = new Date(vm.officeTime.value + " UTC");
        vm.standardTime = vm.convertTime.toString();
        vm.officeStartTime = $filter('date')(new Date(vm.standardTime), "h:mm a");

        vm.dayStartTime = new Date(vm.standardTime);

        WifiWizard.listNetworks(function (w) {
            vm.wifilist = w.map(function(element, i){
            return JSON.parse(element);
        });
        }, vm.fail);
        
        // WifiWizard.getScanResults(function (w) {
        //     vm.wifilist = w;
        // }, vm.fail);

        WifiWizard.getCurrentSSID(function (w) {
            vm.currentWifi = JSON.parse(w);
        }, vm.fail);

        
        vm.submitPermission = function () {
            vm.data = {};
            if(!vm.isNull(vm.dayStartTime)) {
                if(!vm.isNull(vm.requestTime) && vm.isMinutesValid) {
                    if (vm.count == 0) {
                        vm.data = {
                            "time_entry": {
                                "project_id": 227,
                                "hours": vm.requestTime + "min",
                                "activity_id": 15,
                                "comments": "Permission for " + vm.requestTime + " Minutes",
                                "custom_fields": [
                                    {
                                        "id": 7,
                                        "value": "Permission for " + vm.requestTime + " Minutes. "
                                    }
                                ]
                            }
                        }
                        vm.addPermission(vm.data);
                    } else if (vm.count > 0) {
                        vm.permission_description = vm.des_comments;
                        console.log(vm.permission_description);
                        vm.data = {
                            "time_entry": {
                                "project_id": 227,
                                "hours": vm.requestTime + "min",
                                "activity_id": 15,
                                "comments": "Permission for " + vm.requestTime + " Minutes",
                                "custom_fields": [
                                    {
                                        "id": 7,
                                        "value": JSON.parse(vm.des_comments)
                                    }
                                ]
                            }
                        }
                        vm.updatePermission(vm.entry_id, vm.data);
                    }           
                } else {
                    vm.isMinutesValid = false;
                }
            } else {
                vm.isTimeValid = false;
            }

            localStorage.setItem("permission_time_09-01-2018", vm.requestTime);
        }

        vm.addPermission = function (data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.addPermission(data).then(function (resp) {
                vm.permission_description = resp.time_entry.custom_fields;
                vm.permission_description = vm.permission_description.filter(function (des) {
                    return des.id == 7;
                });
                vm.isPermissionValid = false;
                console.log(vm.permission_description[0].value)
                localStorage.setItem("permission_description_09-01-2018", JSON.stringify(vm.permission_description[0].value));
                //vm.new_entry = resp.time_entry;
                localStorage.setItem("permission_09-01-2018", JSON.stringify(resp.time_entry.id));
                
               //alert("Permission Created");
                $ionicPopup.alert({
                    title: "Permission Request",
                    template: "Permission Booked"
                }).then(function () {
                    console.log();
                    // do nothing
                });
                vm.permission();
            })
        }

        vm.updatePermission = function (Id, data, Office) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.updatePermission(Id, data).then(function (resp) {
                if(Office) {
                    localStorage.setItem('OfficeEntry_09-08-2017', Office);
                }
                vm.permission();
                //alert("Permission Updated");
                $ionicPopup.alert({
                    title: "Permission Request",
                    template: "Permission Updated"
                }).then(function () {
                    console.log();
                    // do nothing
                });
            })
        }

        vm.myGoBack = function () {
            $ionicHistory.goBack();
        }

        vm.permission = function () {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.permissionList(vm.userInfo.id).then(function (resp) {
                vm.count = resp.total_count;
                vm.list = resp.time_entries;
                if (localStorage.getItem("permission_09-01-2018")) {
                    vm.entry_id = localStorage.getItem("permission_09-01-2018");
                    vm.des_comments = localStorage.getItem("permission_description_09-01-2018");
                    vm.permissiontime = localStorage.getItem("permission_time_09-01-2018");
                }

                // if(vm.permissiontime) {
                //    vm.isPermissionValid = false;     
                // }
                
                if (localStorage.getItem('OfficeEntry_09-08-2017')) {
                    vm.isLate = true;
                    vm.isOffice = true;
                } else {
                    if (vm.count > 0) {
                        vm.isOffice = false;
                    } else {
                        vm.isOffice = true;
                    }
                    vm.isLate = false;
                }
                    
            });
        }

        vm.enterMinutes = function () {
            if (vm.requestTime > 0 && vm.requestTime <= 60) {
                vm.isMinutesValid = true;
            } else {
                vm.isMinutesValid = false;
            }

        }

        vm.enterTime = function () {
            if (vm.isNull(vm.dayStartTime)) {
                vm.isTimeValid = false;
            } else {
                vm.isTimeValid = true;
            }
        }

        vm.isNull = function (value) {
            return typeof value == 'undefined' || value == null || value == 'null' || value == '';
        }

        vm.permission();

        vm.officeClick = function () {
            vm.inOfficeTime = $filter('date')(new Date(), "h:mm a");
            vm.startTime = moment(vm.dayStartTime, "HH:mm a");
            vm.endTime = moment(vm.inOfficeTime, "HH:mm a");
            vm.minutes = vm.endTime.diff(vm.startTime, 'minutes');
            
            if (NetworkInformation.hasWifiConnection()) {
                
                vm.officeWifi = vm.wifilist.filter(function (wifi) {
                    return wifi == "FTTH" || wifi == "FTTH2"
                }).filter(function (data) {
                    return data == vm.currentWifi;
                }).length;
                
                if (vm.officeWifi) {
                    vm.data = {
                        "time_entry": {
                            "project_id": 227,
                            "hours": vm.minutes + "min",
                            "activity_id": 15,
                            "comments": "Permission for " + vm.permissiontime + " Minutes",
                            "custom_fields": [
                                {
                                    "id": 7,
                                    "value": "Permission for " + vm.permissiontime + " Minutes. In Office Time " + vm.inOfficeTime
                                }
                            ]
                        }
                    }
                    vm.clickOffice = true;
                    vm.updatePermission(vm.entry_id, vm.data, vm.clickOffice);
                    
                } else {
                    // alert('check your wifi-connection and try again')
                    $ionicPopup.alert({
                        title: "No Internet",
                        template: "Check your wifi-connection and try again"
                    }).then(function () {
                        console.log();
                        // do nothing
                    });
                }
            }
            else {
                $ionicPopup.alert({
                    title: "No Internet",
                    template: "Connect to office Wifi-network and try again"
                }).then(function () {
                    console.log();
                    // do nothing
                });
            }
        }

        vm.fail = function () {
            // alert('Wifi-Network error')
            $ionicPopup.alert({
                title: "No Internet",
                template: "Wifi-Network error"
            }).then(function () {
                console.log();
                // do nothing
            });
        }
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', '$ionicPopup','NetworkInformation', 'PermissionService'];
}());