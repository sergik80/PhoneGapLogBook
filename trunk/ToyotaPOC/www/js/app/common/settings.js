angular.module('settings', [])
.constant('AppSettings', {
    network_watch_interval: 1000, //ms
    gps_error_threshold: 5,
    map_zoom: 12,
    OnNetworkStatusChange: 'event::OnNetworkStatusChange'
});