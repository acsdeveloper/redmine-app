
(function() {
	'use strict';
	function LunchService(Request,$q,$filter) {
		var vm = this;
        vm.deferred = $q.defer();

        vm.showbooked = function () {
            vm.date = $filter('date')(new Date(), "yyyy-MM-dd");
            console.log(vm.date)
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json?project_id=342&limit=100&spent_on="+vm.date;
            return Request.get(vm.url).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
        };

        /*POST API accept email and password and provide access to the application*/
        vm.lunch = function (options) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json";
            return Request.post(vm.url,options).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
        };
        vm.cancellunch = function (id) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries/"+ id +".json";
            return Request.delete(vm.url).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
        };
	}

	angular.module('redmine.lunch', [])
		.service('LunchService', LunchService);
        LunchService.$inject = ['Request','$q','$filter'];
}())