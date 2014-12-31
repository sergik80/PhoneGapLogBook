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
