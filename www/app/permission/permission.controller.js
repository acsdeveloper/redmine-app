
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, NetworkInformation, PermissionService) {
    	var vm = this;

        vm.isOffice = true;
        vm.userInfo = JSON.parse(localStorage.getItem("authDetails"));
        vm.time = vm.userInfo.custom_fields;
        vm.isTimeValid = true;
        vm.isMinutesValid = true;  
        
        vm.authdata = {
            "headers"  : {
                    "Authorization" : "",
            }
        }

        vm.data = {
            "time_entry" : {
                "project_id": 227,
                "hours": "0.20",
                "activity_id": 15,
                "comments": "permission"
            }
        }

        angular.forEach(vm.time, function (element) {
            if(element.name == "Office Start Time") {
                vm.officeTime = element;
            }
        })

        vm.officeStartTime = $filter('date')(new Date(vm.officeTime.value), "h:mm a");
        vm.officeEntryTime = $filter('date')(new Date(), "h:mm a");


        vm.startTime = moment(vm.officeStartTime, "HH:mm a");
        vm.endTime = moment(vm.officeEntryTime, "HH:mm a");
        vm.hours = vm.endTime.diff(vm.startTime, 'hours');
        vm.minutes = vm.endTime.diff(vm.startTime, 'minutes');
        
        vm.dayStartTime = new Date(vm.officeTime.value);

        if(vm.minutes >= 0 && vm.minutes <= 59 && vm.hours == 0) {
            vm.isLate = false;
        } else {
            vm.isLate = true;
        }

        // if(NetworkInformation.hasNetworkConnection()) {
            
        // }
        vm.isLate = false;
        if(NetworkInformation.hasWifiConnection()) {
              
        }

    
        vm.submitPermission = function () {  
            vm.data = {};
            if(vm.isNull(vm.dayStartTime)) {
                vm.isTimeValid = false;
            } else if(vm.isNull(vm.requestTime)) {
                vm.isMinutesValid = false;
            } else {
                if(vm.count == 0) {
                    vm.data = {
                        "time_entry" : {
                            "project_id": 227,
                            "hours": "0.20",
                            "activity_id": 15,
                            "comments": "Permission for "+ vm.requestTime + " Minutes"
                        }
                    }
                    vm.addPermission(vm.data);
                } else if (vm.count > 0) {
                    vm.data = {
                        "time_entry" : {
                            "project_id": 227,
                            "hours": "0.40",
                            "activity_id": 15,
                            "comments": "Update Permission for "+ vm.requestTime + " Minutes"
                        }
                    }
                    vm.updatePermission(vm.entry_id, vm.data);
                }
                
            }
        }

        vm.addPermission = function (data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.addPermission(data).then(function (resp) {
                console.log(resp.time_entry.id);
                //vm.new_entry = resp.time_entry;
                localStorage.setItem("permission_09-01-2018", JSON.stringify(resp.time_entry.id));
                vm.permission();
            })
        }

        vm.updatePermission = function (Id,data) {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.updatePermission(Id,data).then(function (resp) {
                vm.permission();
            })
        }

        vm.myGoBack = function() {
            $ionicHistory.goBack();
        }

        vm.permission = function() {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.permissionList(vm.userInfo.id).then(function(resp)  {
                vm.count = resp.total_count;
                console.log(resp);
                // vm.list = resp.time_entries;
                if(localStorage.getItem("permission_09-01-2018")) {
                    vm.entry_id = localStorage.getItem("permission_09-01-2018");
                }
                // vm.current = vm.list.filter(function(data) {
                //     return data.id = vm.entry_id
                // })
                if(vm.count > 0) {
                    vm.isOffice = true;
                } else {
                    vm.isOffice = false;
                }
            });
        }

        vm.enterMinutes = function() {
            if(vm.requestTime > 0 && vm.requestTime <= 60) {
                vm.isMinutesValid = true;
            } else {
               vm.isMinutesValid = false;  
            } 
            
        }

        vm.enterTime = function() {
            if(vm.isNull(vm.dayStartTime)) {
                vm.isTimeValid = false;
            } else {
                vm.isTimeValid = true;
            }
        }

        vm.isNull = function(value) {
            return typeof value == 'undefined' || value == null || value == 'null' || value == '';
        }

        vm.permission(); 

    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', 'NetworkInformation', 'PermissionService'];
}());