var logManualControllers = angular.module('logtrip.manual.controllers', ['SQLservices']);

logManualControllers.controller('LogManualController', ['$q', '$scope', '$routeParams', '$location', 'Trips', 'Vehicles', 'Drivers', 'NatureOfTrip', 
  	function($q, $scope, $routeParams, $location, Trips, Vehicles, Drivers, NatureOfTrip) {

	$scope.loadVehicles = function() {
		Vehicles.all().then(function(allvehicles){
			$scope.allvehicles = allvehicles;
		}); 
	}
	
	$scope.loadDrivers = function() {
		Drivers.all().then(function(alldrivers){
			$scope.alldrivers = alldrivers;
		}); 
	}

	$scope.loadNatureOfTrips = function() {
		NatureOfTrip.all().then(function(allnatureoftrips){
			$scope.allnatureoftrips = allnatureoftrips;
		}); 
	}

	$scope.addTrip = function(kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto) {
		Trips.add(kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto);
 		$location.url("/viewtrips");
		$scope.loadVehicles();
		$scope.loadDrivers();
		$scope.loadNatureOfTrips();
	}

	$scope.loadVehicles();
	$scope.loadDrivers();
	$scope.loadNatureOfTrips();
	
}]);

