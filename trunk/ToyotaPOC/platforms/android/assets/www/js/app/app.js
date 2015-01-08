"use strict";

var app = angular.module('ToyotaPOCApp', [
    'ngRoute',
    'edittrip',
    'settings',
    'phonegap',
    'viewtrips',
    'logtrip',
    'locator',
    'update-details',
    'SQLservices'
]).run(function(DB) {
	DB.openDb();
    DB.createTables();
    DB.setupRecords();
});


app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.when('/', {
            templateUrl: 'views/home.html'
        }).
        when('/viewtrips', {
            templateUrl: 'views/viewtrips.html',
            controller: 'ViewTripsController'
        }).
        when('/logtrip', {
            templateUrl: 'views/logtrip.html'
        }).
        when('/logtrip/gpstracker', {
            templateUrl: 'views/logtrip.gpstracker.html',
            controller: 'GPSTrackerController'
        }).
        when('/logtrip/manual', {
            templateUrl: 'views/logtrip.manual.html',
            controller: 'LogManualController'
        }).
        when('/update/edittrip/:id', {
            templateUrl: 'views/edittrip.html',
            controller: 'EditTripController'
        }).
        when('/updatedetails', {
            templateUrl: 'views/update-details.html'
        }).
        when('/update/driver', {
            templateUrl: 'views/driver.html',
            controller: 'DriverController'
        }).
        when('/update/editdriver/:id', {
            templateUrl: 'views/editdriver.html',
            controller: 'EditDriverController'
        }).
        when('/update/vehicle', {
            templateUrl: 'views/vehicle.html',
            controller: 'VehicleController'
        }).
        when('/update/editvehicle/:id', {
            templateUrl: 'views/editvehicle.html',
            controller: 'EditVehicleController'
        }).
        when('/locator', {
            templateUrl: 'views/locator.html',
            controller: 'LocatorController'
        }).
        when('/lookup', {
            templateUrl: 'views/lookup.html',
            controller: 'LookupController'
        })
        
        
        
        ;
}]);

app.run(['$rootScope', 'AppSettings', 'NetworkService', 'NotificationService',
    function ($rootScope, AppSettings, NetworkService, NotificationService) {
        NetworkService.startMonitoring();
        $rootScope.$on(AppSettings.OnNetworkStatusChange, function (event, networkReady) {
            $rootScope.NetworkReady = networkReady;
            if (!networkReady) {
                NotificationService.alert('Lost Network!', 'Network', 'Ok');
            }
    });
}]);
