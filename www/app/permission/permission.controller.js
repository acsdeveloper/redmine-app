
(function () {
    'use strict';
    function PermissionCtrl(PermissionService) {

    }

    angular.module('redmine.permission')
        .controller('PermissionCtrl', PermissionCtrl)
    PermissionCtrl.$inject = ['PermissionService'];
}());