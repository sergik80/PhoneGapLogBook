var logbookControllers = angular.module('logbookControllers', []);

logbookControllers.controller('LogbookController', [ '$scope', 'localStorageService',
		function($scope, localStorageService) {
			$scope.loadData = function() {
				$scope.entries = localStorageService.get('logbookEntries');
			}
			$scope.orderProp = 'serviceDate';
			$scope.addService = function(date, details, centre) {
				var logbookEntries = localStorageService.get('logbookEntries');
				if(!logbookEntries) logbookEntries = [];
				logbookEntries.push({
					serviceId : 0,
					serviceDate : date,
					serviceDetails : details,
					serviceCentre: centre
				});
				localStorageService.set('logbookEntries', logbookEntries);
				$scope.loadData();
			}
			$scope.loadData();
		} ]);

logbookControllers.controller('LogbookEntryController', [ '$scope',
		'$routeParams', 'Logbook', function($scope, $routeParams, Logbook) {
			$scope.entry = Logbook.get({
				serviceId : $routeParams.serviceId
			}, function(phone) {
				// $scope.mainImageUrl = phone.images[0];
			});

			// $scope.setImage = function(imageUrl) {
			// $scope.mainImageUrl = imageUrl;
			// }
		} ]);