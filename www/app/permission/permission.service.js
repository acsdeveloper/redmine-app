
(function() {
	'use strict';
	function PermissionService($q, $filter, Request) {
		var vm = this;
		vm.deferred = $q.defer();
		vm.date = $filter('date')(new Date(), "yyyy-MM-dd");
		
		vm.addPermission = function(options) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json";
            return Request.post(vm.url,options).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
		}

		vm.updatePermission = function(id, options) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries/"+ id +".json";
            return Request.put(vm.url,options).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
		}

		vm.permissionList = function(Id) {
			vm.url = "https://pm.agilecyber.co.uk/time_entries.json?project_id=227&user_id="+ Id +"&limit=100&spent_on="+vm.date;
			return Request.get(vm.url).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
		}
	}

	angular.module('redmine.permission', [])
		.service('PermissionService', PermissionService);
        PermissionService.$inject = ['$q', '$filter', 'Request'];
}())