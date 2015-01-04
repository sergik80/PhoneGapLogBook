angular.module('logtrip.gpstracker', ['logtrip.gpstracker.controllers', 'uiGmapgoogle-maps'])
.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDT51isQ2Hrr9MDwnKAKjcVvaJfc9zId8I',
        v: '3.17'
        //libraries: 'geometry,visualization'
    });
}]);