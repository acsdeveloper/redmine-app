/*global angular*/
/*global localStorage*/
(function () {
    'use strict';
    angular.module('redmine.service', [])
        .factory("Request", function ($http, $q) {
            return {
                get: function (url, callback) {
                    var deferred = $q.defer();
                    Loader.startLoading();
                    var cb = callback || angular.noop;
                    $http.get(url).success(function (response, status) {
                        if (status === 200) {
                            Loader.stopLoading();
                            deferred.resolve(response);
                            return cb(response);
                        } else {
                            Loader.stopLoading();
                            deferred.reject(response.message);
                            return cb(response);
                        }
                    }).error(function (err) {
                        Loader.stopLoading();
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
                    return deferred.promise;
                },
                post: function (url, postData, callback) {
                    var deferred = $q.defer();
                    Loader.startLoading();
                    var cb = callback || angular.noop;
                    $http.defaults.headers.post["Content-Type"] = "application/json";
                    $http.post(url, postData).success(function (response, status) {
                        if (status === 200) {
                            Loader.stopLoading();
                            deferred.resolve(response);
                            return cb();
                        } else {
                            Loader.stopLoading();
                            deferred.reject(response.message);
                            return cb(response);
                        }
                    }).error(function (err) {
                        Loader.stopLoading();
                        deferred.reject();
                        $ionicPopup.alert({
                            title: 'Error',
                            template: err.message
                        }).then(function (res) {
                            console.log(res);
                        });
                        return cb(err);
                    }.bind(this));

                    return deferred.promise;
                },
                patch: function (url, postData, callback) {
                    var deferred = $q.defer();
                    Loader.startLoading();
                    var cb = callback || angular.noop;
                    $http.defaults.headers.post["Content-Type"] = "application/json";
                    $http.patch(url, postData).success(function (response, status) {
                        if (status === 200) {
                            Loader.stopLoading();
                            deferred.resolve(response);
                            return cb();
                        } else {
                            Loader.stopLoading();
                            deferred.reject(response.message);
                            return cb(response);
                        }
                    }).error(function (err) {
                        Loader.stopLoading();
                        deferred.reject();
                        $ionicPopup.alert({
                            title: 'Error',
                            template: err.message
                        }).then(function (res) {
                            // do nothing
                        });
                        return cb(err);
                    }.bind(this));

                    return deferred.promise;
                },
                delete: function (url, postData, callback) {
                    var deferred = $q.defer();

                    Loader.startLoading();
                    var cb = callback || angular.noop;
                    $http.defaults.headers.post["Content-Type"] = "application/json";
                    console.log(postData);
                    $http.delete(url, postData).success(function (response, status) {
                        if (status === 200) {
                            Loader.stopLoading();
                            deferred.resolve(response);
                            return cb();
                        } else {
                            Loader.stopLoading();
                            deferred.reject(response.message);
                            return cb(response);
                        }
                    }).error(function (err) {
                        Loader.stopLoading();
                        //deferred.reject("Timeout");
                        $ionicPopup.alert({
                            title: 'Error',
                            template: err.message
                        }).then(function (res) {
                            // do nothing
                        });
                        return cb(err);
                    }.bind(this));

                    return deferred.promise;
                }
            };
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
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
                    config.headers['Content-Type'] = 'application/json';
                    //config.timeout = 10000;
                    return config;
                }
            };
        }
        );
}());
