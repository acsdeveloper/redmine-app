(function () {
    'use strict';
    angular.module('redmine.loader', [])
        .factory('Loader', function ($ionicLoading) {
            return {
                startLoading: function () {
                    $ionicLoading.show({
                      template: '<ion-spinner class="spinner-energized"></ion-spinner>',
                      showBackdrop: false
                    });
                },

                stopLoading: function () {
                    $ionicLoading.hide();
                }
            };
        }
    );
})();