
(function () {
    'use strict';
    function ReportCtrl($ionicHistory, ReportService) {
    	var vm = this;
    	vm.myGoBack = function() {
    		$ionicHistory.goBack();
    	}
    }

    angular.module('redmine.report')
        .controller('ReportCtrl', ReportCtrl)
    ReportCtrl.$inject = ['$ionicHistory', 'ReportService'];
}());