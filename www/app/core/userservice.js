/*global angular*/
/*global UserService*/
(function () {
    'use strict';
    angular.module('redmine.userservice', [])
        .service("UserService", UserService);
    function UserService() {
        this.isLoggedIn = function () {
            /*global localStorage:false*/
            return localStorage.getItem("authDetails") ? true : false;
        };
    }
}());