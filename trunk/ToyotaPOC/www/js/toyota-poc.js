var app = angular.module('ToyotaPOCApp', [
    'ngRoute',
    'viewtrips',
    'logtrip',
    'locator',
    'update-details'
]);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'views/home.html'
        }).
        when('/viewtrips', {
            templateUrl: 'views/viewtrips.html',
            controller: 'ViewTripsController'
        }).
        when('/logtrip', {
            templateUrl: 'views/logtrip.html'
        }).
        when('/logtrip/gpstracker', {
            templateUrl: 'views/logtrip.gpstracker.html',
            controller: 'GPSTrackerController'
        }).
        when('/logtrip/manual', {
            templateUrl: 'views/logtrip.manual.html',
            controller: 'LogManualController'
        }).
        when('/updatedetails', {
            templateUrl: 'views/update-details.html'
        }).
        when('/update/driver', {
            templateUrl: 'views/driver.html',
            controller: 'DriverController'
        }).
        when('/update/vehicle', {
            templateUrl: 'views/vehicle.html',
            controller: 'VehicleController'
        }).
        when('/locator', {
            templateUrl: 'views/locator.html',
            controller: 'LocatorController'
        });
}]);


var locatorControllers = angular.module('locator.controllers', []);

locatorControllers.controller('locatorCtrl', ['$scope', function ($scope) {
    // TODO
}]);
angular.module('locator', ['locator.controllers']);
angular.module('logtrip', ['logtrip.manual', 'logtrip.gpstracker']);
angular.module('update-details', ['driver', 'vehicle']);
var viewtripsControllers = angular.module('viewtrips.controllers', []);

viewtripsControllers.controller('ViewTripsController', ['$scope', function ($scope) {
	// TODO
}]);
angular.module('viewtrips', []);
var gpsTrackerControllers = angular.module('logtrip.gpstracker.controllers', []);

gpsTrackerControllers.controller('GPSTrackerController', ['$scope', function ($scope) {
    // TODO
}]);
angular.module('logtrip.gpstracker', ['logtrip.gpstracker.controllers']);
var logManualControllers = angular.module('logtrip.manual.controllers', []);

logManualControllers.controller('LogManualController', ['$scope', function ($scope) {
	// TODO
}]);
angular.module('logtrip.manual', ['logtrip.manual.controllers']);
var driverControllers = angular.module('driver.controllers', []);

driverControllers.controller('DriverController', ['$scope', function ($scope) {
    // TODO
}]);
angular.module('driver', ['driver.controllers']);
var vehicleControllers = angular.module('vehicle.controllers', []);

vehicleControllers
		.controller(
				'VehicleController',
				[
						'$scope',
						'localStorageService',
						function($scope, localStorageService) {
							$scope.loadData = function() {
								$scope.entries = localStorageService
										.get('vehicles');
							}
							$scope.orderProp = 'serviceDate';
							$scope.selectImage = function() {
								navigator.camera
										.getPicture(
												function(imageURI) {
													document.getElementById('newVehicleImage').src = imageURI;
													document.getElementById('newVehicleImageSrc').value = imageURI;
												},
												function(message) {
													alert('Failed because: '
															+ message);
													console
															.log('Failed because: '
																	+ message)
												},
												{
													quality : 50,
													sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
													destinationType : Camera.DestinationType.FILE_URI
												});
							}
							$scope.addVehicle = function(imgUri, name) {
								var vehicles = localStorageService
										.get('vehicles');
								if (!vehicles)
									vehicles = [];
								vehicles.push({
									vehicleId : 0,
									vehicleImg : imgUri,
									vehicleName : name
								});
								localStorageService.set('vehicles', vehicles);
								$scope.loadData();
							}

							$scope.loadData();
						} ]);

vehicleControllers.controller('VehicleEntryController', [ '$scope',
		'$routeParams', 'Vehicle', function($scope, $routeParams, Vehicle) {
			$scope.entry = Vehicle.get({
				serviceId : $routeParams.serviceId
			}, function(phone) {
				$scope.mainImageUrl = phone.images[0];
			});

			$scope.setImage = function(imageUrl) {
				$scope.mainImageUrl = imageUrl;
			}
		} ]);
angular.module('vehicle', ['vehicle.controllers']);
var edittripControllers = angular.module('edittrip.controllers', []);

edittripControllers.controller('EditTripController', ['$scope', function ($scope) {
    // TODO
}]);
angular.module('edittrip', ['edittrip.controllers']);