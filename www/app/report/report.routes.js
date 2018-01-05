
(function () {
	'use strict';
	angular.module('redmine.report')
		.config(function($stateProvider) {
			$stateProvider
				.state('report', {
					url: '/report', 
					templateUrl: 'app/report/report.html',
					controller: 'ReportCtrl',
					controllerAs: 'vm'
				})
		})
}())