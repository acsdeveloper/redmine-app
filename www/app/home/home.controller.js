
(function () {
    'use strict';
    function HomeCtrl(HomeService,$filter) {
            var vm=this;
            vm.islunchbook = true;
            vm.date = $filter('date')(new Date(), "h:mm:ss a");
            console.log(vm.date);
            if(vm.date > "4:00:00 PM" && vm.date < "5:00:00 PM")
            {
                vm.islunchbook= true;
            } 
            else
            {
                vm.islunchbook= false;
            }
            vm.booklunch = function()
            {

            }
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService','$filter'];
}());