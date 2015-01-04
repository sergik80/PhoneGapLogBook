angular.module('logtrip.gpstracker.services', ['phonegap', 'settings'])

.factory('TrackingService', ['GeolocationService', 'NotificationService', function (GeolocationService, NotificationService) {
    var trackingData = []; // Array containing GPS position objects
    var startPosition = null;
    var lastPosition = null;
    var watchId = null;
    var errorCount = 0;

    function startTracking() {
        trackingData = [];

        var options = { frequency: 3000, enableHighAccuracy: true };
        GeolocationService.watchPosition(
            function (position) {
                
                if (startPosition == null) startPosition = position;
                lastPosition = position;
                trackingData.push(position);
                errorCount = 0;
            },
            function () {
                //error
                errorCount++;
                if (errorCount > AppSettings.gps_error_threshold) {
                    //NotificationService.alert('Error', 'error', 'Ok');
                    //errorCount = 0;
                }
            }, options);
    };

    function stopTracking() {
        if (watchId) {
            GeolocationService.clearWatch(watchId);
            watchId = null;
        }

        return trackingData;
    }

    return {
        getCurrentPosition: GeolocationService.getCurrentPosition,
        startTracking: startTracking,
        stopTracking: stopTracking,
        startPosition: startPosition,
        lastPosition: lastPosition
    }
}]);