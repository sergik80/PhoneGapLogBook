"use strict";

var app = angular.module('ToyotaPOCApp', [
    'ngRoute',
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
      $routeProvider.
        when('/', {
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
        when('/updatedetails', {
            templateUrl: 'views/update-details.html'
        }).
        when('/update/driver', {
            templateUrl: 'views/driver.html',
            controller: 'DriverController'
        }).
        when('/update/vehicle', {
            templateUrl: 'views/vehicle.html',
            controller: 'VehicleController'
        }).
        when('/locator', {
            templateUrl: 'views/locator.html',
            controller: 'LocatorController'
        });
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
