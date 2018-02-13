
(function () {
	'use strict';
	angular.module('redmine.home')
		.config(function($stateProvider) {
			$stateProvider
				.state('home', {
					url: '/home', 
					cache : false,
					templateUrl: 'app/home/home.html',
					controller: 'HomeCtrl',
					controllerAs: 'vm'
				})
		})
}())