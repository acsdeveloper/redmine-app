(function () {
    'use strict';
    angular.module('redmine.network', [])
        .factory('NetworkInformation', function ($cordovaNetwork) {
            return {
                hasNetworkConnection: function () {
                    if ($cordovaNetwork.isOnline()) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };
        });
}());