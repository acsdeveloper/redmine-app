
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, PermissionService) {
    	var vm = this;
    	vm.myGoBack = function() {
    		$ionicHistory.goBack();
        }
        vm.getuserDetails = localStorage.getItem('authDetails');
        vm.getuserDetails = JSON.parse(vm.getuserDetails);
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', 'PermissionService'];
}());