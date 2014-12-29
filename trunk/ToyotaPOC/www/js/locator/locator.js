window.addEventListener('load', function () {
document.addEventListener("deviceready", function(){

	
	var connState = navigator.connection.type;
	if( connState == Connection.NONE){
		$("#internetAccessButton")
		.text('No Internet Access')
		.button('refresh');
	}
	else{
		$("#internetAccessButton")
		.text('Connected to ' + connState + " network" )
	    .button('refresh');
	}	
});
}, false);



var serviceId;
var versNum = 0;
$(document).ready(function() {
    $(".serviceList").click(function() {
    	serviceId = $(this).html();
        navigator.geolocation.watchPosition(success, error, { timeout: 60000, maximumAge:60000, enableHighAccuracy: true });
    });
});




function success(result)
{
	var coords = result.coords;	
	showPosition(coords.longitude, coords.latitude, serviceId);
}

function error(error){
	alert(error.code + " " + error.message);
}



function showPosition(longitude, latitude, serviceId)
{
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
	var version = document.getElementById('version');
	versNum += 1;
	version.innerHTML = versNum;
	
	var canvas = document.getElementById('mapCanvasLookup');	
	// Set the initial Lat and Long of the Google Map
	var myLatLng = new google.maps.LatLng(latitude, longitude);
	var destLatLng = getServiceLatLng(serviceId);
	var trackCoords = [myLatLng, destLatLng];
	

 // Google Map options
	var myOptions = {
     zoom: 15,
     center: myLatLng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(canvas, myOptions);

    directionsDisplay.setMap(map);
    var directionsOptions = {
        origin: myLatLng,
        destination: destLatLng, 
        travelMode: google.maps.TravelMode.DRIVING
    };
   
    directionsService.route(directionsOptions, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result); 
        }
    });

}





function getServiceLatLng(serviceId)
{
	switch(serviceId)
	{
	case 'Service 1':
		return new google.maps.LatLng(-33.8587, 151.2140);
		
	case 'Service 2':
		return new google.maps.LatLng(-33.8587, 151.2140);
		
	case 'Service 3':
		return new google.maps.LatLng(-33.8587, 151.2140);
		
		default:
			return new google.maps.LatLng(-33.8587, 151.2140);
	}
}




$(document).ready(function(){
	$("#lookupRedirect").on('click', function(){
		
		window.location = '../locator/serviceLookup.html';
	});
});
/////////////////////////////////////////////////////////////////

