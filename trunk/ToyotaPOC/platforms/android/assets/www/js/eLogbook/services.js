var logbookServices = angular.module('logbookServices', [ 'ngResource' ]);

logbookServices.factory('LogbookService', [ '$rootScope', function($rootScope) {
	var service = {

		model : {
			serviceId : 0,
			serviceDate : new Date(),
			serviceDetails : "Details here",
			serviceCentre: "Some service centre"
		},

		SaveState : function() {
			localStorage.userService = angular.toJson(service.model);
		},

		RestoreState : function() {
			service.model = angular.fromJson(localStorage.userService);
		}
	}

	$rootScope.$on("savestate", service.SaveState);
	$rootScope.$on("restorestate", service.RestoreState);

	return service;
} ]);