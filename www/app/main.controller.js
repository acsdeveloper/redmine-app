(function() {
	'use strict';
	function MainCtrl ($state) {
		$state.go('login');
	}

	angular.module('redmine.controllers', [])
		.controller('MainCtrl', MainCtrl);
	MainCtrl.$inject = ['$state'];
}());