
(function () {
    'use strict';
    function ReportCtrl(ReportService,$http,AuthInterceptor,$ionicHistory) {
        var vm = this;
        vm.years = [];
        vm.date = new Date();
        vm.project_id = 342;
        vm.def = 0;
        vm.getUserdetails = JSON.parse(localStorage.getItem("authDetails"));
        
        vm.monthsvalue = vm.date.getMonth();
        vm.yearvalue = parseInt(vm.date.getFullYear());
        
        vm.years.push(vm.yearvalue)
        vm.years.push(vm.yearvalue - 1)
        vm.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        vm.authdata = {
			"headers"  : {
					"Authorization" : "",
			}
        }
        
        vm.getreports= function() {
            vm.auth = localStorage.getItem("authoptions");
            $http.defaults.headers.common['Authorization'] = vm.auth;
            vm.authdata.headers.Authorization = vm.auth;
            AuthInterceptor.request(vm.authdata);
            var firstDay = new Date(vm.yearvalue, vm.monthsvalue, 1);
            var lastDay = new Date(vm.yearvalue, vm.monthsvalue + 1, 0);
            vm.currentdate = "><"+ vm.yearvalue + "-" + vm.monthformat(vm.monthsvalue) + "-" + vm.dayformat( firstDay.getDate() ) + "|" 
                        +  vm.yearvalue + "-" + vm.monthformat(vm.monthsvalue) + "-" + lastDay.getDate();
            
            ReportService.getreport(vm.project_id,vm.getUserdetails.id,vm.currentdate).then(function(resp){
                    
                    vm.report = resp.length;
                    vm.totaldays = resp.total_count;
                    vm.totalamount = vm.totaldays * 10;
            });
        }

        vm.monthformat = function(month) {
            return ((month+1) < 10 ? '0' + (month+1) : (month+1)) ;
        }
        vm.dayformat = function(day) {
            return ((day) < 10 ? '0' + day : day ) ;
        }
        
        vm.getreports();
        vm.myGoBack = function() {
    		$ionicHistory.goBack();
    	}
    }

    angular.module('redmine.report')
        .controller('ReportCtrl', ReportCtrl)
    ReportCtrl.$inject = ['ReportService','$http','AuthInterceptor','$ionicHistory'];
}());