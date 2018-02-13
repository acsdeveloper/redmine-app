
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, $ionicPopup, NetworkInformation, PermissionService, $cordovaDatePicker) {
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

        /** For IOS **/
        vm.convertTime = new Date(vm.officeTime.value.replace(/-/g, "/") + " UTC");

        /** For Android **/
        //vm.convertTime = new Date(vm.officeTime.value + " UTC");

        vm.options = {
            date: new Date(),
            mode: 'time',
            allowOldDates: true,
            allowFutureDates: false,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
        };

        vm.standardTime = vm.convertTime.toString();
        vm.officeStartTime = $filter('date')(new Date(vm.standardTime), "h:mm a");

        vm.submitPermission = function () {
            vm.data = {};
            if (!vm.isNull(vm.dayStartTime)) {
                if (!vm.isNull(vm.requestTime) && vm.isMinutesValid) {
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
                vm.isPermissionValid = false;
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

                if (Office) {
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

        vm.myGoBack = function () {
            $ionicHistory.goBack();
        }

        vm.permission = function () {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.permissionList(vm.userInfo.id).then(function (resp) {
                console.log(resp);
                if(resp.total_count === 1)
                {
                    if (localStorage.getItem("permission_id")) {
                        vm.entry_id = localStorage.getItem("permission_id");
                        vm.permissionTime = localStorage.getItem("permission_time");
                        vm.isOffice = false;
                        vm.isPermissionValid = false;
                    } else {
                        vm.isOffice = true;
                    }
                }
                else
                {
                    localStorage.removeItem("permission_id");
                    localStorage.removeItem("startTime");
                    vm.isPermissionValid = true;
                    vm.clickOffice = true;
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

            $cordovaDatePicker.show(vm.options).then(function (date) {
                vm.dayStartTime = $filter('date')(new Date(date), "h:mm a");
                localStorage.setItem('startTime', vm.dayStartTime)
            });
        }

        vm.isNull = function (value) {
            return typeof value == 'undefined' || value == null || value == 'null' || value == '';
        }

        vm.permission();

        if (vm.isNull(localStorage.getItem('startTime'))) {
            vm.dayStartTime = $filter('date')(new Date(vm.convertTime), "h:mm a");
        } else {
            vm.dayStartTime = localStorage.getItem('startTime');
        }

        vm.officeClick = function () {
            vm.inOfficeTime = $filter('date')(new Date(), "h:mm a");

            vm.startTime = moment(vm.dayStartTime, "h:mm a");
            vm.endTime = moment(vm.inOfficeTime, "h:mm a");
            vm.minutes = vm.endTime.diff(vm.startTime, 'minutes');
            // console.log(vm.minutes)
            vm.minutes = (15 * Math.ceil(vm.minutes / 15));
            // console.log(vm.minutes)
            if (NetworkInformation.hasWifiConnection()) {
                NetworkInformation.wifiNetworks().then(function (resp) {
                    console.log(resp);
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
                                        "value": "Today Office Start Time " + vm.dayStartTime + " Permission for " + vm.permissionTime + " Minutes. In Office Time " + vm.inOfficeTime
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
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', '$ionicPopup', 'NetworkInformation', 'PermissionService', '$cordovaDatePicker'];

}());