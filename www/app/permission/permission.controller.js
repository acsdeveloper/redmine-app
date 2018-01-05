
(function () {
    'use strict';
    function PermissionCtrl($ionicHistory, PermissionService) {
    	var vm = this;
    	vm.myGoBack = function() {
    		$ionicHistory.goBack();
    	}
    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['$ionicHistory', 'PermissionService'];
}());