
(function () {
    'use strict';
    function LunchCtrl(LunchService, $http, AuthInterceptor, $ionicHistory, $filter, $ionicPopup) {
        var vm = this;
        vm.lunchbooked_id = "";
        vm.lunchoptions = "Yes";
        vm.lunchparam = {
            "time_entry": {
                "project_id": 342,
                "hours": 0.00,
                "activity_id": 16,
                "comments": "I need lunch today",
                "custom_fields": [
                    {
                        "id": 39,
                        "value": "1"
                    }
                ]
            }
        }
        vm.time = moment(new Date(), "h:mm:ss a");
        vm.LunchTime = moment("11:30:00 AM", "h:mm:ss a");
        vm.getUserdetails = JSON.parse(localStorage.getItem("authDetails"));

        vm.authdata = {
            "headers": {
                "Authorization": "",
            }
        }
        vm.booklunch = function () {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            if (vm.time.isBefore(vm.LunchTime)) {
                LunchService.lunch(vm.lunchparam).then(function (resp) {
                    vm.lunchbooked_id = resp.time_entry.id;
                });
                vm.lunchbooking();
            }
            else {
                $ionicPopup.alert({
                    title: "Lunch Booking",
                    template: "You can't book lunch today"
                }).then(function () {

                });
            }
        }

        vm.cancellunch = function (lunchid) {
            if (vm.time.isBefore(vm.LunchTime)) {
                LunchService.cancellunch(lunchid).then(function (resp) {
                    vm.lunchbooked_id = "";
                });
                vm.lunchbooking();
            }
            else {
                $ionicPopup.alert({
                    title: "Lunch Booking",
                    template: "You can't cancel the lunch now"
                }).then(function () {

                });
            }
        }

        vm.lunchbooking = function () {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            LunchService.showbooked().then(function (resp) {

                vm.totay_count = resp.total_count;
                vm.users = resp.time_entries;
                vm.currentuser_booking = vm.users.filter(function (data, i) {
                    return data.user.id == vm.getUserdetails.id;
                });
                if (vm.currentuser_booking.length > 0) {
                    vm.lunch_message = "Your lunch is booked."
                    angular.forEach(vm.currentuser_booking, function (list) {
                        vm.lunchbooked_id = list.id;
                    });
                }
                else {
                    vm.lunch_message = "Your lunch is not booked yet."
                }
            });
        }

        vm.lunchbooking();
        vm.myGoBack = function () {
            $ionicHistory.goBack();
        }

    }

    angular.module('redmine.home')
        .controller('LunchCtrl', LunchCtrl)
    LunchCtrl.$inject = ['LunchService', '$http', 'AuthInterceptor', '$ionicHistory', '$filter', '$ionicPopup'];
}());