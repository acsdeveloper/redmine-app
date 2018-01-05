
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, $filter, NetworkInformation, PermissionService) {
    	var vm = this;
        
        vm.isOffice = true;
        vm.userInfo = JSON.parse(localStorage.getItem("authDetails"));
        console.log(vm.userInfo);
        vm.time = vm.userInfo.custom_fields;
        console.log(vm.time);
        angular.forEach(vm.time, function (element) {
            if(element.id == 40) {
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

        if(NetworkInformation.hasNetworkConnection() ){
            console.log('true');
        }

        vm.latePermission = function () {
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
            vm.officeDetail = localStorage.getItem('officeDetails');
            if(vm.officeDetail == null) {
                console.log(vm.officeDetail);
            } else {
                alert('you are office');
            }
            vm.isLate = true;
            vm.isOffice = true;
            var obj = {
                'today': "entry"
            }
            localStorage.setItem('officeDetails', obj);
        }

        vm.myGoBack = function() {
            $ionicHistory.goBack();
        }

    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', '$filter', 'NetworkInformation', 'PermissionService'];
}());