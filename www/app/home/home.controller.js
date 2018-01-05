
(function () {
    'use strict';
    function HomeCtrl(HomeService, $filter, $state) {
            var vm = this;
            vm.islunchbook = true;
            vm.date = $filter('date')(new Date(), "h:mm:ss a");
            console.log(vm.date);
            if(vm.date > "4:00:00 PM" && vm.date < "8:00:00 PM") {
                vm.islunchbook= true;
            } 
            else {
                vm.islunchbook= false;
            }
            vm.booklunch = function() {
                $state.go("lunch")
            }

            vm.permission = function() {
                $state.go("permission");
            }
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService', '$filter', '$state'];
}());