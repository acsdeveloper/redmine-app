
(function () {
	'use strict';
	angular.module('redmine.login')
		.config(function($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login', 
					templateUrl: 'app/login/login.html',
					controller: 'LoginCtrl',
					controllerAs: 'vm'
				})
		})
}())