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

driverControllers.controller('EditDriverController', ['$q', '$scope', '$routeParams', '$location', 'Drivers', 
  	function($q, $scope, $routeParams, $location, Drivers) {
  		$scope.loadData = function() {
  			var entryId = $routeParams.id;
  			Drivers.getById(entryId).then(function(entry,firstname, lastname, address){
  				$scope.entry = entry;
  				$scope.firstname = entry.firstname;
  				$scope.lastname = entry.lastname;
  				$scope.address = entry.address;
  			}); 
  		}
  		
  		$scope.updateDriver = function(id, firstname, lastname, address) {
  			Drivers.update(id, firstname, lastname, address);
  	 		$location.url("/update/driver");
  		}

  		$scope.loadData();
  }]);
