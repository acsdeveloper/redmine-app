
(function() {
  'use strict';
  angular.module('redmine', 
    [
      'redmine.core',
      'redmine.service',
      'redmine.userservice',
      'redmine.login',
      'redmine.controllers',
      'redmine.home',
      'redmine.lunch',
      'redmine.office',
      'redmine.permission',
      'redmine.report',
      'redmine.network'
    ])
    .run(function($ionicPlatform, $rootScope) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

      });
    })  
}());


