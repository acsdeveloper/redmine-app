
(function () {
	'use strict';
	angular.module('redmine.lunch')
		.config(function($stateProvider) {
			$stateProvider
				.state('lunch', {
					url: '/lunch', 
					templateUrl: 'app/lunch/lunch.html',
					controller: 'LunchCtrl',
					controllerAs: 'vm'
				})
		})
}())