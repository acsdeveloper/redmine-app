
(function () {
	'use strict';
	function LoginCtrl(LoginService,Base64,AuthInterceptor,$http,UserService,$rootScope,$state) {
		var vm = this;
		vm.username = "";
		vm.password = "";
		vm.isUsernameValid = true;
		vm.isPasswordValid = true;
		vm.authdata = {
			"headers"  : {
					"Authorization" : "",
			}
		}
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
					vm.details = Base64.encode(vm.username + ':' + vm.password);
					vm.authdata.headers.Authorization = "Basic " + vm.details;
					console.log("Basic " + vm.details)
					console.log(vm.authdata.headers.Authorization)
					$http.defaults.headers.common['Authorization'] = 'Basic ' + vm.details;
					localStorage.setItem("authoptions", vm.authdata.headers.Authorization);
					AuthInterceptor.request(vm.authdata);
					LoginService.login().then(function (resp) {
						localStorage.setItem("authDetails", JSON.stringify(resp.user));
						 $rootScope.$broadcast('LOGGED_IN', {isLoggedIn: true});
						 if (UserService.isLoggedIn()) {
								$state.go('home');
					 	  }
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
	LoginCtrl.$inject = ['LoginService','Base64','AuthInterceptor','$http','UserService','$rootScope','$state'];
}());