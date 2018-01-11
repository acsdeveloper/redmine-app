/*global angular*/
/*global localStorage*/
(function () {
    'use strict';
    angular.module('redmine.service', [])
        .factory("Request", function ($http, $q,$ionicPopup, NetworkInformation) {
            return {
                get: function (url, callback) {
                    var deferred = $q.defer();
                    if (NetworkInformation.hasNetworkConnection()) {
                        var cb = callback || angular.noop;
                        $http.get(url).success(function (response, status) {
                            if (status === 200) {
                                deferred.resolve(response);
                                return cb(response);
                            } else {
                             
                                deferred.reject(response.message);
                                return cb(response);
                            }
                        }).error(function (err) {
                           
                            //deferred.reject("Timeout");
                            $ionicPopup.alert({
                                title: 'Error',
                                template: err.message
                            }).then(function (res) {
                                console.log(res);
                                // do nothing
                            });
                            return cb(err);
                        }.bind(this));
                    } else {
                        deferred.reject("No Internet Connection");
                        $ionicPopup.alert({
                            title: 'No Internet',
                            template: 'Please check your device internet connection'
                        }).then(function (res) {
                            
                        });
                    }    
                    return deferred.promise;
                },
                post: function (url, postData, callback) {
                    var deferred = $q.defer();
                    if (NetworkInformation.hasNetworkConnection()) {
                        var cb = callback || angular.noop;
                        $http.defaults.headers.post["Content-Type"] = "application/json";
                        $http.post(url, postData).success(function (response, status) {
                            if (status === 200 || status === 201)  {
                                deferred.resolve(response);
                                return cb();
                            } else {
                                deferred.reject(response.message);
                                return cb(response);
                            }
                        }).error(function (err) {
                            deferred.reject();
                            $ionicPopup.alert({
                                title: 'Error',
                                template: err.message
                            }).then(function (res) {
                                console.log(res);
                            });
                            return cb(err);
                        }.bind(this));
                    } else {
                        deferred.reject("No Internet Connection");
                        $ionicPopup.alert({
                            title: 'No Internet',
                            template: 'Please check your device internet connection'
                        }).then(function (res) {
                            
                        });
                    }    
                    return deferred.promise;
                },
                patch: function (url, postData, callback) {
                    var deferred = $q.defer();
                    if (NetworkInformation.hasNetworkConnection()) {
                        var cb = callback || angular.noop;
                        $http.defaults.headers.post["Content-Type"] = "application/json";
                        $http.patch(url, postData).success(function (response, status) {
                            if (status === 200) {
                                deferred.resolve(response);
                                return cb();
                            } else {
                                deferred.reject(response.message);
                                return cb(response);
                            }
                        }).error(function (err) {
                            deferred.reject();
                            $ionicPopup.alert({
                                title: 'Error',
                                template: err.message
                            }).then(function (res) {
                                // do nothing
                            });
                            return cb(err);
                        }.bind(this));
                    } else {
                        deferred.reject("No Internet Connection");
                        $ionicPopup.alert({
                            title: 'No Internet',
                            template: 'Please check your device internet connection'
                        }).then(function (res) {
                            
                        });
                    }    
                    return deferred.promise;
                },
                put: function (url, postData, callback) {
                    var deferred = $q.defer();
                    if (NetworkInformation.hasNetworkConnection()) {
                        var cb = callback || angular.noop;
                        $http.defaults.headers.post["Content-Type"] = "application/json";
                        $http.put(url, postData).success(function (response, status) {
                            if (status === 200 || status === 201)  {
                                deferred.resolve(response);
                                return cb();
                            } else {
                                deferred.reject(response.message);
                                return cb(response);
                            }
                        }).error(function (err) {
                            deferred.reject();
                            $ionicPopup.alert({
                                title: 'Error',
                                template: err.message
                            }).then(function (res) {
                                console.log(res);
                            });
                            return cb(err);
                        }.bind(this));
                    } else {
                        deferred.reject("No Internet Connection");
                        $ionicPopup.alert({
                            title: 'No Internet',
                            template: 'Please check your device internet connection'
                        }).then(function (res) {
                            
                        });
                    }   
                    return deferred.promise;
                },
                delete: function (url, postData, callback) {
                    var deferred = $q.defer();
                    if (NetworkInformation.hasNetworkConnection()) {
                        var cb = callback || angular.noop;
                        $http.defaults.headers.post["Content-Type"] = "application/json";
                
                        $http.delete(url).success(function (response, status) {
                            if (status === 200 || status === 201) {
                                deferred.resolve(response);
                                return cb();
                            } else {
                                deferred.reject(response.message);
                                return cb(response);
                            }
                        }).error(function (err) {
                            //deferred.reject("Timeout");
                            $ionicPopup.alert({
                                title: 'Error',
                                template: err.message
                            }).then(function (res) {
                                // do nothing
                            });
                            return cb(err);
                        }.bind(this));
                     } else {
                        deferred.reject("No Internet Connection");
                        $ionicPopup.alert({
                            title: 'No Internet',
                            template: 'Please check your device internet connection'
                        }).then(function (res) {
                            
                        });
                    }   
                    return deferred.promise;
                }
            };
        })
        .factory('Base64', function () {
            /* jshint ignore:start */
          
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          
            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
          
                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
          
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
          
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
          
                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
          
                    return output;
                },
          
                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
          
                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        window.alert("There were invalid base64 characters in the input text.\n" +
                            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                            "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          
                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));
          
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
          
                        output = output + String.fromCharCode(chr1);
          
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
          
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
          
                    } while (i < input.length);
          
                    return output;
                }
            };
          
            /* jshint ignore:end */
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]
        ).factory('AuthInterceptor', function () {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    // if (Constants.productionServer) {
                        /*config.headers.accountId = 1303;*/ //GIANNSSO
                        /*config.headers.accountId = 1617;*/ //Andrew Jose
                        /*config.headers.accountId = 2023;*/ //to get booking details
                        // if (UserService.isLoggedIn()) {
                        //     var authDetails = JSON.parse(localStorage.getItem('authDetails'));
                        //     config.headers.authToken = authDetails.authToken;
                        // }
                        // config.headers.apiKey = Constants.apiKey;
                        // config.headers.accountId = Constants.accountId;
                    // }
                    // config.headers['authorization'] = 'Basic c3ZzdmlqYXk6c3ZzMTY0dmlqYXk=';
                    // config.headers['cache-control'] = 'no-cache';
                    config.headers['Content-Type'] = 'application/json';
                    // config.timeout = 10000;
                    return config;
                }
            };
        }
        );
}());
