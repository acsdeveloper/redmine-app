
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, $ionicPopup,NetworkInformation, PermissionService) {
        var vm = this;

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

        // WifiWizard.listNetworks(function (w) {
        //     vm.wifilist = w.map(function(element, i){
        //         return JSON.parse(element);
        //     });
        // }, vm.fail);
        

        // WifiWizard.getCurrentSSID(function (w) {
        //     vm.currentWifi = JSON.parse(w);
        // }, vm.fail);

        
        vm.submitPermission = function () {
            vm.data = {};
            if(!vm.isNull(vm.dayStartTime)) {
                if(!vm.isNull(vm.requestTime) && vm.isMinutesValid) {
                    console.log(vm.requestTime, vm.isMinutesValid);
                    console.log(localStorage.getItem("permission_id"));
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
                    if (vm.isNull(localStorage.getItem("permission_id"))) {
                        vm.addPermission(vm.data);
                    } else {
                        vm.updatePermission(vm.entry_id, vm.data);
                    }
                    localStorage.setItem("permission_time", vm.requestTime);           
                } else {
                    vm.isMinutesValid = false;
                }
            } else {
                vm.isTimeValid = false;
            }
        }

        vm.addPermission = function (data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.addPermission(data).then(function (resp) {
                // vm.permission_description = resp.time_entry.custom_fields;
                // vm.permission_description = vm.permission_description.filter(function (des) {
                //     return des.id == 7;
                // });
                vm.isPermissionValid = false;
                // console.log(vm.permission_description[0].value)
                // localStorage.setItem("permission_description", JSON.stringify(vm.permission_description[0].value));
                localStorage.setItem("permission_id", JSON.stringify(resp.time_entry.id));
                
                $ionicPopup.alert({
                    title: "Permission Request",
                    template: "Permission Booked"
                }).then(function () {
                   
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
                    //vm.sendEmail();
                    localStorage.removeItem("permission_id");
                    localStorage.removeItem("startTime");
                    vm.isPermissionValid = true;
                }
                vm.permission();

                $ionicPopup.alert({
                    title: "Permission Request",
                    template: "Permission Updated"
                }).then(function () {
                    
                });
            })
        }

        // vm.sendEmail = function() {
        //     vm.send = {
        //         "from": vm.userInfo.mail,
        //         "comments": "Permission for " + vm.permissionTime + " Minutes. In Office Time " + vm.inOfficeTime,
                
        //     }
        //     PermissionService.sendEmail(vm.send).then(function(resp) {

        //     })

        // }

        vm.myGoBack = function () {
            $ionicHistory.goBack();
        }

        vm.permission = function () {
            if(localStorage.getItem("permission_id")) {
                vm.entry_id = localStorage.getItem("permission_id");
                //vm.des_comments = localStorage.getItem("permission_description");
                vm.permissionTime = localStorage.getItem("permission_time");
                vm.isOffice = false;
                vm.isPermissionValid = false;
            } else {
                vm.isOffice = true;
            }
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
                localStorage.setItem('startTime', vm.dayStartTime)
                vm.isTimeValid = true;
            }
        }

        vm.isNull = function (value) {
            return typeof value == 'undefined' || value == null || value == 'null' || value == '';
        }

        vm.permission();

        if(vm.isNull(localStorage.getItem('startTime'))) {
            vm.dayStartTime = new Date(vm.standardTime);    
        } else {
            vm.dayStartTime = new Date(localStorage.getItem('startTime'));
        }

        vm.officeClick = function () {
            vm.dayTime = $filter('date')(new Date(vm.dayStartTime), "h:mm a");
            vm.inOfficeTime = $filter('date')(new Date(), "h:mm a");

            vm.startTime = moment(vm.dayTime, "h:mm a");
            vm.endTime = moment(vm.inOfficeTime, "h:mm a");
            vm.minutes = vm.endTime.diff(vm.startTime, 'minutes');

            if (NetworkInformation.hasWifiConnection()) {
                NetworkInformation.wifiNetworks().then(function(resp) {
                    vm.officeWifi = resp.wifiList.filter(function (wifi) {
                        return wifi == "FTTH" || wifi == "FTTH2"
                    }).filter(function (data) {
                        return data == resp.currentWifi;
                    }).length;
                
                    if (vm.officeWifi) {
                        vm.data = {
                            "time_entry": {
                                "project_id": 227,
                                "hours": vm.minutes + "min",
                                "activity_id": 15,
                                "comments": "Permission for " + vm.permissionTime + " Minutes",
                                "custom_fields": [
                                    {
                                        "id": 7,
                                        "value": "Permission for " + vm.permissionTime + " Minutes. In Office Time " + vm.inOfficeTime
                                    }
                                ]
                            }
                        }
                        vm.clickOffice = true;
                        vm.updatePermission(vm.entry_id, vm.data, vm.clickOffice);
                        
                    } else {
                        $ionicPopup.alert({
                            title: "No Internet",
                            template: "Check your wifi-connection and try again"
                        }).then(function () {
                            
                        });
                    }
                })
            } else {
                $ionicPopup.alert({
                    title: "No Internet",
                    template: "Connect to office Wifi-network and try again"
                }).then(function () {
                    
                });
            }
        }

        vm.fail = function () {
            
            $ionicPopup.alert({
                title: "No Internet",
                template: "Wifi-Network error"
            }).then(function () {
                
            });
        }
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', '$ionicPopup','NetworkInformation', 'PermissionService'];
}());