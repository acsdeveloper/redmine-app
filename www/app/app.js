
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
    .run(function($ionicPlatform, $rootScope, $ionicHistory, $filter) {
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

        var handleBackButton = function () {
         if ("home" === $ionicHistory.currentStateName() || "login" === $ionicHistory.currentStateName()) {
              ionic.Platform.exitApp();
          } else {
              $ionicHistory.goBack();
          }
        };

        var todayDate = $filter('date')(new Date(), "dd-MM-yyyy");
        

        $ionicPlatform.registerBackButtonAction(handleBackButton, 999);
          $rootScope.$ionicGoBack = function () {
          handleBackButton();
        };

      });
    })  
}());


