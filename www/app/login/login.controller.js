
(function () {
	'use strict';
	function LoginCtrl(LoginService) {
		var vm = this;
		vm.username = "";
		vm.password = "";
		vm.isUsernameValid = true;
		vm.isPasswordValid = true;

		vm.validateUsername = function () {
            if (vm.username !== null && vm.username !== '' && vm.username !== "") {
                vm.isUsernameValid = true;
            }
		};
		
		vm.validatePassword = function () {
			if (vm.password !== null && vm.password !== '' && vm.password !== "") {
				vm.isPasswordValid = true;
			}
		};
		vm.login = function () {
			 if (vm.username !== null && vm.username !== '' && vm.username !== "") {
				if (vm.password !== null && vm.password !== '' && vm.password !== "") {
					LoginService.login(vm.username,vm.password).then(function (resp) {
						console.log(resp)
					});
				}
				else
				{
					vm.isPasswordValid = false;
				}
			}
			else
			{
				vm.isUsernameValid = false;
			}
		}
	}

	angular.module('redmine.login')
		.controller('LoginCtrl', LoginCtrl)
	LoginCtrl.$inject = ['LoginService'];
}());