(function () {
    'use strict';
    angular.module('redmine.network', [])
        .factory('NetworkInformation', function ($cordovaNetwork,$q, $timeout) {
            return {
                hasNetworkConnection: function () {
                    if ($cordovaNetwork.isOnline()) {
                        return true;
                    } else {
                        return false;
                    }
                },
                hasWifiConnection: function () {
                    if (navigator.connection) {
                        var networkState = navigator.connection.type;
                        if (networkState == "wifi") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                wifiNetworks: function() {
                    var object = {};
                    var deferred = $q.defer();
                    var wifilist = [];
                    var currentWifi = "";
                
                    WifiWizard.listNetworks(function (w) {
                        wifilist = w.map(function(element, i){
                            return JSON.parse(element);
                        });
                    });
                    WifiWizard.getCurrentSSID(function (w) {
                        currentWifi = w.replace(/["]+/g, '');
                    });
                    $timeout(function() {
                        object['wifiList'] = wifilist;
                        object['currentWifi'] = currentWifi;
                        deferred.resolve(object);
                    },10);
                    return deferred.promise;
                }
            };
        });
}());