
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, NetworkInformation, PermissionService) {
        var vm = this;

        vm.isOffice = true;
        vm.userInfo = JSON.parse(localStorage.getItem("authDetails"));
        vm.time = vm.userInfo.custom_fields;
        vm.isTimeValid = true;
        vm.isMinutesValid = true;
        vm.wifilist = [];
        vm.currentWifi = "";
        vm.authdata = {
            "headers": {
                "Authorization": "",
            }
        }

        vm.data = {
            "time_entry": {
                "project_id": 227,
                "hours": "0.20",
                "activity_id": 15,
                "comments": "permission"
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

        vm.startTime = moment(vm.officeStartTime, "HH:mm a");
        vm.endTime = moment(vm.officeEntryTime, "HH:mm a");
        vm.hours = vm.endTime.diff(vm.startTime, 'hours');
        vm.minutes = vm.endTime.diff(vm.startTime, 'minutes');


        if (vm.minutes >= 0 && vm.minutes <= 59 && vm.hours == 0) {
            vm.isLate = false;
        } else {
            vm.isLate = true;
        }

        // if(NetworkInformation.hasNetworkConnection()) {

        // }
        vm.isLate = false;
        // if(NetworkInformation.hasWifiConnection()) {

        // }

        WifiWizard.getScanResults(function (w) {
            vm.wifilist = w;
        }, vm.fail);

        WifiWizard.getCurrentSSID(function (w) {
            vm.currentWifi = JSON.parse(w);
        }, vm.fail);


        vm.submitPermission = function () {
            vm.data = {};
            if (vm.isNull(vm.dayStartTime)) {
                vm.isTimeValid = false;
            } else if (vm.isNull(vm.requestTime)) {
                vm.isMinutesValid = false;
            } else {
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
                                    "value": "Permission for " + vm.requestTime + " Minutes"
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
                            "comments": "Update Permission for " + vm.requestTime + " Minutes",
                            "custom_fields": [
                                {
                                    "id": 7,
                                    "value": vm.des_comments
                                }
                            ]
                        }
                    }
                    vm.updatePermission(vm.entry_id, vm.data);
                }
            }
            localStorage.setItem("permission_time_09-01-2018", vm.requestTime);
        }

        
        vm.addPermission = function (data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.addPermission(data).then(function (resp) {
                console.log(resp.time_entry.id);
                console.log(resp.time_entry);
                vm.permission_description = resp.time_entry.custom_fields;
                vm.permission_description = vm.permission_description.filter(function (des) {
                    return des.id == 7;
                });
                console.log(vm.permission_description[0].value)
                localStorage.setItem("permission_description_09-01-2018", JSON.stringify(vm.permission_description[0].value));
                //vm.new_entry = resp.time_entry;
                localStorage.setItem("permission_09-01-2018", JSON.stringify(resp.time_entry.id));

                alert("Permission Created");
                vm.permission();
            })
        }

        vm.updatePermission = function (Id, data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.updatePermission(Id, data).then(function (resp) {
                vm.permission();
                alert("Permission Updated");
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
                console.log(resp);
                vm.list = resp.time_entries;
                if (localStorage.getItem("permission_09-01-2018")) {
                    vm.entry_id = localStorage.getItem("permission_09-01-2018");
                    vm.des_comments = localStorage.getItem("permission_description_09-01-2018");
                    vm.permissiontime = localStorage.getItem("permission_time_09-01-2018");
                }
                // vm.current = vm.list.filter(function(data) {
                //     return data.id = vm.entry_id
                // })
                if (vm.count > 0) {
                    vm.isOffice = false;
                } else {
                    vm.isOffice = true;
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
            console.log(NetworkInformation.hasWifiConnection());
            if (NetworkInformation.hasWifiConnection()) {
                console.log(vm.wifilist);
                vm.officeWifi = vm.wifilist.filter(function (wifi) {
                    return wifi.SSID == "FTTH" || wifi.SSID == "FTTH2"
                }).filter(function (data) {
                    return data.SSID == vm.currentWifi;
                }).length;
                if (vm.officeWifi) {
                    vm.data = {
                        "time_entry": {
                            "project_id": 227,
                            "hours": vm.requestTime + "min",
                            "activity_id": 15,
                            "comments": "Update Permission for " + vm.requestTime + " Minutes",
                            "custom_fields": [
                                {
                                    "id": 7,
                                    "value": vm.des_comments
                                }
                            ]
                        }
                    }
                    console.log(vm.entry_id)
                    console.log(vm.data)
                    // vm.updatePermission(vm.entry_id, vm.data);
                } else {
                    alert('check your wifi-connection and try again')
                }
            }
            else {
                alert('Connect to office Wifi-network and try again')
            }
        }

        vm.fail = function () {
            alert('Wifi-Network error')
        }
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', 'NetworkInformation', 'PermissionService'];
}());