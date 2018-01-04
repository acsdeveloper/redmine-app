
(function () {
    'use strict';
    function HomeCtrl(HomeService) {

    }

    angular.module('redmine.home')
        .controller('HomeCtrl', HomeCtrl)
    HomeCtrl.$inject = ['HomeService'];
}());