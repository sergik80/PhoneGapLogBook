var edittripControllers = angular.module('edittrip.controllers', ['SQLservices']);

edittripControllers.controller('EditTripController', ['$q', '$scope', 'Trips', 'Vehicles', 'Drivers', 'NatureOfTrip', 
function($q, $scope, Trips, Vehicles, Drivers, NatureOfTrip) {

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
		$scope.loadVehicles();
		$scope.loadDrivers();
		$scope.loadNatureOfTrips();
	}

	$scope.loadVehicles();
	$scope.loadDrivers();
	$scope.loadNatureOfTrips();
	
}]);

