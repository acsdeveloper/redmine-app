(function () {
    'use strict';
    angular.module('redmine.network', [])
        .factory('NetworkInformation', function ($cordovaNetwork) {
            return {
                hasNetworkConnection: function () {
                    console.log(navigator.connection);
                    // console.log(networkinterface);
                    // WifiWizard.listNetworks() 
                    if ($cordovaNetwork.isOnline()) {
                        return true;
                    } else {
                        return false;
                    }
                },
                hasWifiConnection: function () {
                    if (navigator.connection) {
                        var networkState = navigator.connection.type;
                        console.log(networkState);
                        if (networkState == "wifi") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            };
        });
}());