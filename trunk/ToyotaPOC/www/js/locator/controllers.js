var vehicleControllers = angular.module('vehicleControllers', []);

vehicleControllers
		.controller(
				'VehicleController',
				[
						'$scope',
						'localStorageService',
						function($scope, localStorageService) {
							$scope.loadData = function() {
								$scope.entries = localStorageService
										.get('vehicles');
							}
							$scope.orderProp = 'serviceDate';
							$scope.selectImage = function() {
								navigator.camera
										.getPicture(
												function(imageURI) {
													document.getElementById('newVehicleImage').src = imageURI;
													document.getElementById('newVehicleImageSrc').value = imageURI;
												},
												function(message) {
													alert('Failed because: '
															+ message);
													console
															.log('Failed because: '
																	+ message)
												},
												{
													quality : 50,
													sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
													destinationType : Camera.DestinationType.FILE_URI
												});
							}
							$scope.addVehicle = function(imgUri, name) {
								var vehicles = localStorageService
										.get('vehicles');
								if (!vehicles)
									vehicles = [];
								vehicles.push({
									vehicleId : 0,
									vehicleImg : imgUri,
									vehicleName : name
								});
								localStorageService.set('vehicles', vehicles);
								$scope.loadData();
							}

							$scope.loadData();
						} ]);

vehicleControllers.controller('VehicleEntryController', [ '$scope',
		'$routeParams', 'Vehicle', function($scope, $routeParams, Vehicle) {
			$scope.entry = Vehicle.get({
				serviceId : $routeParams.serviceId
			}, function(phone) {
				$scope.mainImageUrl = phone.images[0];
			});

			$scope.setImage = function(imageUrl) {
				$scope.mainImageUrl = imageUrl;
			}
		} ]);