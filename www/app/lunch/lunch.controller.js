
(function () {
    'use strict';
    function LunchCtrl(LunchService, $http,AuthInterceptor,$ionicHistory) {
        var vm=this;
        vm.lunchbooked_id  ="";
        vm.lunchoptions = "Yes";
        vm.lunchparam = {
            "time_entry" : {
                "project_id" : 342,
                "hours"  : 0.01,
                "activity_id" : 16,
                "comments"  : "I need lunch today",
                "custom_fields" : [
                    {
                        "id" : 39,
                        "value" : "1"
                    }
                ]
            }
        }
        vm.getUserdetails = JSON.parse(localStorage.getItem("authDetails"));
        console.log(vm.getUserdetails.id)
        vm.authdata = {
			"headers"  : {
					"Authorization" : "",
			}
		}
        vm.booklunch =function()
        {   
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            LunchService.lunch(vm.lunchparam).then(function(resp)  {
                console.log(resp)
                vm.lunchbooked_id = resp.time_entry.id;
            });
            vm.lunchbooking();
        }

        vm.cancellunch = function(lunchid)
        {
            console.log(lunchid);
            LunchService.cancellunch(lunchid).then(function(resp)  {
                console.log(vm.lunchbooked_id)
                vm.lunchbooked_id  = "";
                console.log(vm.lunchbooked_id)
            });
            vm.lunchbooking();
        }

        vm.lunchbooking = function()
        {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            LunchService.showbooked().then(function(resp)  {
                console.log(resp)
                vm.totay_count = resp.total_count;
                vm.users = resp.time_entries;
                vm.currentuser_booking = vm.users.filter(function(data,i)
                {
                    return data.user.id == vm.getUserdetails.id;
                });
                if(vm.currentuser_booking.length > 0) 
                {
                    angular.forEach(vm.currentuser_booking, function (list) {
                        vm.lunchbooked_id = list.id;

                    });
                    vm.lunch_message = "Your lunch is booked."
                }
                else
                {
                    vm.lunch_message = "Your lunch is not booked yet."
                }
            });
        }

        vm.lunchbooking();
        vm.myGoBack = function() {
    		$ionicHistory.goBack();
    	}
                
    }

    angular.module('redmine.home')
        .controller('LunchCtrl', LunchCtrl)
    LunchCtrl.$inject = ['LunchService','$http','AuthInterceptor','$ionicHistory'];
}());