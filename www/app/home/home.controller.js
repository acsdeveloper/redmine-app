
(function () {
    'use strict';
    function HomeCtrl(HomeService, $filter, $state) {
        var vm = this;
        vm.islunchbook = true;
        vm.date = moment(new Date(), "h:mm:ss a");
        vm.startTime = moment("8:00:00 AM", "h:mm:ss a");
        vm.endTime = moment("11:30:00 AM", "h:mm:ss a");
        if (vm.date.isBetween(vm.startTime, vm.endTime)) {
            vm.islunchbook = true;
        } else {
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
    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService', '$filter', '$state'];
}());
