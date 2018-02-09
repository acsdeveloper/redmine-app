
(function() {
  'use strict';
  angular.module('redmine', 
    [
      'redmine.core',
      'redmine.controllers',
      'redmine.network',
      'redmine.service',
      'redmine.userservice',
      'redmine.loader',
      'redmine.login',
      'redmine.home',
      'redmine.lunch',
      'redmine.permission',
      'redmine.report'
    ])
    .run(function($ionicPlatform, $rootScope, $ionicHistory, $filter) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
         
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

        var handleBackButton = function () {
         if ("home" === $ionicHistory.currentStateName() || "login" === $ionicHistory.currentStateName()) {
              ionic.Platform.exitApp();
          } else {
              $ionicHistory.goBack();
          }
        };

        $ionicPlatform.registerBackButtonAction(handleBackButton, 999);
          $rootScope.$ionicGoBack = function () {
          handleBackButton();
        };

      });
    })  
}());


