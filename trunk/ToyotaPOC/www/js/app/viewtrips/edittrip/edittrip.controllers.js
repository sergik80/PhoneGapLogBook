var edittripControllers = angular.module('edittrip.controllers', ['SQLservices']);

edittripControllers.controller('EditTripController', ['$q', '$scope', '$routeParams', '$location', 'Trips', 'Vehicles', 'Drivers', 'NatureOfTrip', 
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

	$scope.loadTrip= function(){
		var entryId = $routeParams.id;
		Trips.getById(entryId).then(function(entry,kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto){
			$scope.entry = entry;
			$scope.kmfrom = entry.kmfrom;
			$scope.kmto = entry.kmto;
			$scope.vehicleid = entry.vehicleid;
			$scope.natureoftripid = entry.natureoftripid;
			$scope.driverid = entry.driverid;
			$scope.datestart = entry.datestart;
			$scope.dateend = entry.dateend;
			$scope.locationfrom = entry.locationfrom;
			$scope.locationto = entry.locationto;
		}); 
	}
	
	$scope.updateTrip = function(id, kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto) {
		Trips.update(id, kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto);
 		$location.url("/viewtrips");
	}

	$scope.loadVehicles();
	$scope.loadDrivers();
	$scope.loadNatureOfTrips();
	$scope.loadTrip();
	
}]);

