
(function() {
	'use strict';
	function PermissionService($q, Request) {
		var vm = this;
		vm.deferred = $q.defer();

		vm.getPermission = function(options) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json";
            return Request.post(vm.url,options).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
		}
	}

	angular.module('redmine.permission', [])
		.service('PermissionService', PermissionService);
        PermissionService.$inject = ['$q', 'Request'];
}())