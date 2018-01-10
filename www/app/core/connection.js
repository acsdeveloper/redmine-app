(function () {
    'use strict';
    angular.module('redmine.connection', [])
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
                    if(navigator.connection) {
                       var networkState = navigator.connection.type;
                       if(networkState == "wifi"){
                            return true;
                       } else if (networkState == "none"){
                            return false;
                       } 
                    }
                }
            };
        });
}());