
(function() {
	'use strict';
	function LoginService(Request,$q) {
		var vm = this;
        vm.deferred = $q.defer();
        /*POST API accept email and password and provide access to the application*/
        vm.login = function () {
			vm.url = "https://pm.agilecyber.co.uk/users/current.json";
            return Request.get(vm.url).then(function (resp) {
                vm.deferred.resolve(resp);
                return resp;
            });
        };
	}

	angular.module('redmine.login', [])
		.service('LoginService', LoginService);
	LoginService.$inject = ['Request','$q'];
}())

