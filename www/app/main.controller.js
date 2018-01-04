(function() {
	'use strict';
	function MainCtrl ($state,UserService) {
		if (UserService.isLoggedIn()) {
            $state.go('home');
        } else {
            $state.go('login');
        }
	}

	angular.module('redmine.controllers', [])
		.controller('MainCtrl', MainCtrl);
	MainCtrl.$inject = ['$state','UserService'];
}());