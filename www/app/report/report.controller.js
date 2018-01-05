
(function () {
    'use strict';
    function ReportCtrl(ReportService,$http,AuthInterceptor) {
        var vm = this;
        vm.years = [];
        vm.date = new Date();
        vm.project_id = 342;
        vm.getUserdetails = JSON.parse(localStorage.getItem("authDetails"));
        console.log(vm.getUserdetails.id)
        vm.monthsvalue = vm.date.getMonth();
        vm.yearvalue = parseInt(vm.date.getFullYear());
        console.log(vm.yearvalue);
        vm.years.push(vm.yearvalue)
        vm.years.push(vm.yearvalue - 1)
        vm.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        vm.authdata = {
			"headers"  : {
					"Authorization" : "",
			}
        }
        
        vm.getreports= function()
        {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            vm.currentdate = vm.yearvalue + "-" + vm.monthformat(vm.monthsvalue) ;
            console.log(vm.project_id,vm.getUserdetails.id,vm.currentdate)
            ReportService.getreport(vm.project_id,vm.getUserdetails.id,vm.currentdate).then(function(resp){
                    console.log(resp)
            });
        }

        vm.monthformat = function(month)
        {
            return ((month+1) < 10 ? '0' + (month+1) : (month+1)) ;
        }
        vm.getreports();
    }

    angular.module('redmine.report')
        .controller('ReportCtrl', ReportCtrl)
    ReportCtrl.$inject = ['ReportService','$http','AuthInterceptor'];
}());