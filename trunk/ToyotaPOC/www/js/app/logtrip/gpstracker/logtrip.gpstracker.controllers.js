angular.module('logtrip.gpstracker.controllers', ['phonegap', 'settings', 'uiGmapgoogle-maps'])

.controller('GPSTrackerController', ['$scope', 'AppSettings', '$log', 'uiGmapGoogleMapApi', 'GeolocationService', function ($scope, AppSettings, $log, GoogleMapApi, GeolocationService) {

    // Map Startup
    GoogleMapApi.then(function (maps) {
        GeolocationService.getCurrentPosition(function (position) {
            $log.debug('setupMap');
            $scope.map = { tripInProgress: false, center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: AppSettings.map_zoom };

            $scope.startMarker = createMarker(position);
            $log.debug(JSON.stringify(position));
        });
    });
    
    // UI Action: Start Trip
    $scope.startTrip = function () {
    	$log.debug("Starting trip");
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
    
    // UI Action: End Trip
    $scope.endTrip = function () {
    	$log.debug("Ending trip");
    	
        var trackingData = GeolocationService.clearWatch();
        $scope.map.tripInProgress = false;

        $log.debug('total km:' + gps_total_km(trackingData));
        // TODO: Save Tip
        // TODO: Move to Edit Trip Page
    };
    
    // test 
    $scope.simulateTracking = function(){
        $interval(function () {
            $scope.lastMarker.coords.latitude = $scope.lastMarker.coords.latitude + 0.01;
        }, 3000);
    }

    function createMarker(position) {
        return { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude }, options: {} };
    };
    
    // calculates total trip in KM
    function gps_total_km(trackingData) {
        var total_km = 0;
        if (trackingData.length <= 1) return 0;

        for (var i = 0; i < trackingData.length; i++) {

            if (i == (trackingData.length - 1)) {
                break;
            }

            total_km += gps_distance(trackingData[i].coords.latitude, trackingData[i].coords.longitude, trackingData[i + 1].coords.latitude, trackingData[i + 1].coords.longitude);
        }

        var total_km_rounded = total_km.toFixed(2);

        return total_km_rounded;
    };

    // calculates distance in KM
    function gps_distance(lat1, lon1, lat2, lon2) {
        // http://www.movable-type.co.uk/scripts/latlong.html
        var R = 6371; // km
        var dLat = (lat2 - lat1) * (Math.PI / 180);
        var dLon = (lon2 - lon1) * (Math.PI / 180);
        var lat1 = lat1 * (Math.PI / 180);
        var lat2 = lat2 * (Math.PI / 180);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    };

}]);