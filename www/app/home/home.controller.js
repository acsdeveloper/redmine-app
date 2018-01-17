
(function () {
    'use strict';
    function HomeCtrl(HomeService, $filter, $state) {
        var vm = this;
        vm.islunchbook = true;
        vm.isreportbook = false;
        vm.date = $filter('date')(new Date(), "h:mm:ss a");
        if (vm.date > "7:00:00 AM" && vm.date < "11:30:00 AM") {
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
            console.log("error")
        }
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService', '$filter', '$state'];
}());
