var driverControllers = angular.module('driver.controllers', ['SQLservices']);

driverControllers.controller('DriverController', ['$q', '$scope', 'Drivers', 
	function($q, $scope, Drivers) {
		$scope.loadData = function() {
			Drivers.all().then(function(entries){
				$scope.entries = entries;
			}); 
		}
		
		$scope.addDriver = function(firstname, lastname, address) {
			Drivers.add(firstname, lastname, address);
			$scope.loadData();
		}

		$scope.removeDriver = function(id) {
			Drivers.remove(id);
			$scope.loadData();
		}

		$scope.loadData();
}]);
