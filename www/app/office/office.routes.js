
(function () {
	'use strict';
	angular.module('redmine.office')
		.config(function($stateProvider) {
			$stateProvider
				.state('office', {
					url: '/office', 
					templateUrl: 'app/office/office.html',
					controller: 'OfficeCtrl',
					controllerAs: 'vm'
				})
		})
}())