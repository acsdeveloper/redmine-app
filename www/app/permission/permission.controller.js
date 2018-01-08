
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, $http, AuthInterceptor, NetworkInformation, PermissionService) {
    	var vm = this;

        vm.isOffice = true;
        vm.userInfo = JSON.parse(localStorage.getItem("authDetails"));
        console.log(vm.userInfo);
        vm.time = vm.userInfo.custom_fields;
        vm.timeZone = "AM";
        console.log(vm.time);
        
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
    
        if(vm.minutes >= 0 && vm.minutes <= 59 && vm.hours == 0) {
            vm.isLate = false;
        } else {
            vm.isLate = true;
        }

        // if(NetworkInformation.hasNetworkConnection()) {
            
        // }

        if(NetworkInformation.hasWifiConnection()) {
              
        }

        vm.changeTime = function() {

        }


        vm.submitPermission = function () {   
            vm.lateDetail = localStorage.getItem('lateDetails');
            if(vm.lateDetail == null) {
                console.log(vm.lateDetail);    
            } else {

            }
            vm.isOffice = false;
            var obj = {
                'today': "entry"
            }
            localStorage.setItem('lateDetails', obj);
        }

        vm.officeClick = function () {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            PermissionService.getPermission(vm.data).then(function (resp) {
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
                if(vm.count > 0) {
                    vm.isOffice = true;
                } else {
                    vm.isOffice = false;
                }
            });
        }

        vm.permission(); 

    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', '$http', 'AuthInterceptor', 'NetworkInformation', 'PermissionService'];
}());