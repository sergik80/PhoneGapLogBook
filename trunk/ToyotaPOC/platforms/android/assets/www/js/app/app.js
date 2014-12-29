var app = angular.module('ToyotaPOCApp', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'views/home.html'
        }).
        when('/vehicle', {
            templateUrl: 'views/vehicle.html',
            controller: 'VehicleController'
        });
}]);

