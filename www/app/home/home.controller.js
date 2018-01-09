
(function () {
    'use strict';
    function HomeCtrl(HomeService, $filter, $state) {
        var vm = this;
        vm.islunchbook = true;
        vm.date = $filter('date')(new Date(), "h:mm:ss a");
        console.log(vm.date);
        if (vm.date > "1:00:00 PM" && vm.date < "8:30:00 PM") {
            vm.islunchbook = true;
        }
        else {
            vm.islunchbook = false;
        }

        vm.permission = function () {
            $state.go("permission")
        }
        vm.booklunch = function () {
            $state.go("lunch")
        }
        vm.report = function () {
            $state.go("report")
        }
        ionic.Platform.ready(function () {
            WifiWizard.getScanResults(function (w) {
                console.log(w)
            }, vm.fail);
            WifiWizard.getCurrentSSID(function (w) {
                console.log(w)
            }, vm.fail);
            WifiWizard.listNetworks(function (w) {
                console.log(w)
            }, vm.fail);
        });

        vm.fail = function () {
            console.log("w")
        }
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService', '$filter', '$state'];
}());
