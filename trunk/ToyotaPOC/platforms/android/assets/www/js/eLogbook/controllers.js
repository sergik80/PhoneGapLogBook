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
			$scope.removeService = function(entry) {
				var logbookEntries = localStorageService.get('logbookEntries');
				if(!logbookEntries) return;
				var found = -1;
				for(var i = 0; i < logbookEntries.length; i++) {
					if(logbookEntries[i].serviceId == entry.serviceId) {
						found = i;
						break;
					}
				}
				if(found != -1) logbookEntries.splice(found, 1);
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