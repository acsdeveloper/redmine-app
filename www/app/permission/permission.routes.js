
(function () {
	'use strict';
	angular.module('redmine.permission')
		.config(function($stateProvider) {
			$stateProvider
				.state('permission', {
					url: '/permission', 
					templateUrl: 'app/permission/permission.html',
					controller: 'PermissionCtrl',
					controllerAs: 'vm'
				})
		})
}())