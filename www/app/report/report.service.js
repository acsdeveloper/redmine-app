
(function() {
	'use strict';
	function ReportService(Request,$q) {
		var vm =this;
		vm.deferred = $q.defer();
		vm.getreport = function(id,userid,date) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json?user_id="+userid+"&project_id="+id+"&limit=100&spent_on="+date;
            return Request.get(vm.url).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
		}
	}

	angular.module('redmine.report', [])
		.service('ReportService', ReportService);
        ReportService.$inject = ['Request','$q'];
}())