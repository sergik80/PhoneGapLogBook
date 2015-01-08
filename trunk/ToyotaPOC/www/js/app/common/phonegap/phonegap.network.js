angular.module('phonegap.network', [])
.factory('NetworkService', ['$rootScope', '$log', '$interval', 'AppSettings', function ($rootScope, $log, $interval, AppSettings) {
    var watchId;
    var lastStatus = false;

    $rootScope.$on('$destroy', function () {
        if (watchId) {
            stopWatch();
        } 
    });

    function networkReady() {
        
        return navigator.network ? navigator.network.connection.type != Connection.NONE : false;
    }
    
    function startWatch() {
        watchId = $interval(function () {
            var newStatus = networkReady();
            if (newStatus != lastStatus){
                $rootScope.$broadcast(AppSettings.OnNetworkStatusChange, newStatus);
                lastStatus = newStatus;
            }
        }, 1000);
    }

    function stopWatch() {
        $interval.cancel(watchId);
        watchId = undefined;
    }

    return { 
        networkReady: networkReady,

        startMonitoring: startWatch,

        stopMonitoring: stopWatch
    };

}]);