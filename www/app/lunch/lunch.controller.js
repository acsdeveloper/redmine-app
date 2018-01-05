
(function () {
    'use strict';
    function LunchCtrl(LunchService, $http,AuthInterceptor) {
        var vm=this;
        vm.lunchbooked_id  ="";
        vm.lunchoptions = "Yes";
        vm.lunchparam = {
            "time_entry" : {
                "project_id" : 342,
                "hours"  : 0.01,
                "activity_id" : 16,
                "comments"  : "I need lunch today"
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
        }

        vm.cancellunch = function(lunchid)
        {
            console.log(lunchid);
            LunchService.cancellunch(lunchid).then(function(resp)  {
                console.log(resp);
                vm.lunchbooked_id  ="";
            });
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
                    console.log(data.user.id)
                });
                console.log(vm.currentuser_booking);
            });
        }

        vm.lunchbooking();

                
    }

    angular.module('redmine.home')
        .controller('LunchCtrl', LunchCtrl)
    LunchCtrl.$inject = ['LunchService','$http','AuthInterceptor'];
}());