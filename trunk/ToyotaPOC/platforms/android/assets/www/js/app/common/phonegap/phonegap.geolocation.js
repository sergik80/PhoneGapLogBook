angular.module('phonegap.geolocation', [])

.factory('GeolocationService', ['$rootScope', '$log', function ($rootScope, $log) {
    var service = this;
    service.watchId = null;
    service.trackingData = [];
    /**
         * Check the geolocation plugin availability.
         * @returns {boolean}
         */
    service.checkGeolocationAvailability = function () {
        $log.debug('cordovaGeolocationService.checkGeolocationAvailability.');
        if (!navigator.geolocation) {
            $log.warn('Geolocation API is not available.');
            return false;
        }
        return true;
    };

    service.positionMoved = function (position) {
        if (service.trackingData.length == 0) return true;
        var lastPosition = service.trackingData[service.trackingData.length - 1];

        return !(position.coords.latitude == lastPosition.coords.latitude && position.coords.longitude == lastPosition.coords.longitude);
    }

    return {

        /**
         * Returns the device's current position to the geolocationSuccess callback with a Position object as the parameter.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationgetcurrentposition
         */
        getCurrentPosition: function (successCallback, errorCallback, options) {
            $log.debug('cordovaGeolocationService.getCurrentPosition.');
            var options = angular.extend({}, { enableHighAccuracy: true, timeout: 10000, maximumAge: Infinity }, options);
            
            // Checking API availability
            if (!service.checkGeolocationAvailability()) {
                return;
            }
            
            // API call
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    if (successCallback && typeof successCallback == 'function')
                        $rootScope.$apply(successCallback(position));
                },
                function (error) {
                    if (errorCallback && typeof errorCallback == 'function')
                        $rootScope.$apply(errorCallback(error));
                },
                options
            );
        },

        /**
         * Returns the device's current position when a change in position is detected.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationwatchposition
         */
        watchPosition: function (successCallback, errorCallback, options) {
            $log.debug('cordovaGeolocationService.watchPosition.');
            // reset tracking data
            service.trackingData = [];
            // extend default options
            var options = angular.extend({}, { enableHighAccuracy: true, frequency: 3000 }, options);

            // Checking API availability
            if (!service.checkGeolocationAvailability()) {
                return;
            }

            // API call
            service.watchId = navigator.geolocation.watchPosition(
                function (position) {
                    if (successCallback && typeof successCallback == 'function' && service.positionMoved(position)) {
                        service.trackingData.push(position);
                        $rootScope.$apply(successCallback(position));
                    }
                },
                function (error) {
                    if (errorCallback && typeof errorCallback == 'function')
                        $rootScope.$apply(errorCallback(error));
                },
                options
            );        
        },

        /**
         * Stop watching for changes to the device's location referenced by the watchID parameter.
         * For more information: https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#navigatorgeolocationclearwatch
         */
        clearWatch: function () {
            $log.debug('cordovaGeolocationService.clearWatch.');

            // Checking API availability
            if (!service.checkGeolocationAvailability() || !service.watchId) {
                return;
            }

            // API call
            navigator.geolocation.clearWatch(service.watchID);
            service.watchID = null;

            return service.trackingData;
        }
    };
}]);