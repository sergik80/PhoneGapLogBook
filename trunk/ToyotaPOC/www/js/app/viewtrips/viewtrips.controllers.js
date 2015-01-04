var viewtripsControllers = angular.module('viewtrips.controllers', ['SQLservices']);

viewtripsControllers.controller('ViewTripsController', [ '$q', '$scope', 'Trips', 
	function($q, $scope, Trips) {
		$scope.loadData = function() {
			Trips.all().then(function(entries){
				$scope.entries = entries;
			}); 
		}
		
		$scope.removeTrip = function(id) {
			Trips.remove(id);
			$scope.loadData();
		}
	
		$scope.loadData();
}]);
