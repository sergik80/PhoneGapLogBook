var gpsTrackerControllers = angular.module('logtrip.gpstracker.controllers', ['phonegap', 'settings']);

gpsTrackerControllers.controller('GPSTrackerController', ['$scope', 'AppSettings', 'uiGmapGoogleMapApi', 'GeolocationService', '$log', function ($scope, AppSettings, uiGmapGoogleMapApi, GeolocationService, $log) {
    var controller = this;
    
    uiGmapGoogleMapApi.then(function (maps) {
        GeolocationService.getCurrentPosition(setupMap);
    });

    function setupMap(position) {
        $log.debug('setupMap');
        $scope.map = { tripInProgress: false, center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: AppSettings.map_zoom };

        $scope.startMarker = createMarker(position);
    }
    
    function createMarker(position) {
        return { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude }, options: {} };
    }
    
    $scope.startTrip = function () {
        GeolocationService.getCurrentPosition(function (position) {
            $log.debug(JSON.stringify(position));   
            if (!$scope.map.tripInProgress) {
                // set starting point
                $scope.startMarker = createMarker(position);
                $scope.map.tripInProgress = true;
            }

            GeolocationService.watchPosition(function (lastPosition) {
                // set last point
                $scope.lastMarker = createMarker(lastPosition);
            });
        },
        function (error) {
            $log.debug(JSON.stringify(error));
        });
    };

    $scope.endTrip = function () {
        var trackingData = GeolocationService.clearWatch();
        $scope.map.tripInProgress = false;
        // TODO: Save Tip
        // TODO: Move to Edit Trip Page
    };

    // test 
    $scope.simulateTracking = function(){
        $interval(function () {
            $scope.lastMarker.coords.latitude = $scope.lastMarker.coords.latitude + 0.01;
        }, 3000);
    }
    
}]);