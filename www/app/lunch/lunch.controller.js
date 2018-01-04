
(function () {
    'use strict';
    function LunchCtrl(LunchService) {

    }

    angular.module('redmine.home')
        .controller('LunchCtrl', LunchCtrl)
    LunchCtrl.$inject = ['LunchService'];
}());