angular.module('logtrip.gpstracker', ['logtrip.gpstracker.controllers', 'uiGmapgoogle-maps'])

.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
		key : 'AIzaSyCaRr1NmrqzlJWuq1cFsr44hOQ0aOGlW4Q',
        v: '3.17'
        //libraries: 'geometry,visualization'
    });
}]);