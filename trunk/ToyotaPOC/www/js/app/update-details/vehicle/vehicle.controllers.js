var vehicleControllers = angular.module('vehicle.controllers', ['SQLservices']);
vehicleControllers.controller(	'VehicleController', [ '$q', '$scope', 'Vehicles',
	function($q, $scope, Vehicles) {
		$scope.loadData = function() {
			Vehicles.all().then(function(entries){
				$scope.entries = entries;
			}); 
		}
		
		$scope.addVehicle = function(registration) {
			Vehicles.add(registration);
			$scope.loadData();
		}
		
		$scope.removeVehicle = function(id) {
			Vehicles.remove(id);
			$scope.loadData();
		}
		
		$scope.loadData();
}]);

vehicleControllers.controller(	'EditVehicleController', [ '$q', '$scope', '$routeParams', '$location'  , 'Vehicles',
 	function($q, $scope, $routeParams, $location, Vehicles) {
 		$scope.loadData = function() {
 			var entryId = $routeParams.id;
 			Vehicles.getById(entryId).then(function(entry,vehiclerego){
 				$scope.entry = entry;
 				$scope.vehiclerego = entry.vehiclerego;
 			}); 
 		}
 		
 		$scope.updateVehicle = function(id, registration) {
 			Vehicles.update(id, registration);
 	 		$location.url("/update/vehicle");
 		}
 		
 		$scope.loadData();
 }]);

