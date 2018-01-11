
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
        
        var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
        var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
        var diff = todayTimeStamp - oneDayTimeStamp;
        var yesterdayDate = new Date(diff);
        console.log(yesterdayDate);

        var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
        console.log(todayDate);

        $ionicPlatform.registerBackButtonAction(handleBackButton, 999);
          $rootScope.$ionicGoBack = function () {
          handleBackButton();
        };

      });
    })  
}());


