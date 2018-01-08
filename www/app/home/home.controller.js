
(function () {
    'use strict';
    function HomeCtrl(HomeService, $filter, $state) {
            var vm=this;
            vm.islunchbook = true;
            vm.date = $filter('date')(new Date(), "h:mm:ss a");
            console.log(vm.date);
            if(vm.date > "9:00:00 AM" && vm.date < "11:30:00 AM") {
                vm.islunchbook= true;
            } 
            else {
                vm.islunchbook= false;
            }
            vm.booklunch = function() {
                $state.go("lunch")
            }

            vm.report = function() {
                $state.go("report")
            }
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService', '$filter', '$state'];
}());
