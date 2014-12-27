// check connection
document.addEventListener("deviceready", function(){
	
	var connState = navigator.connection.type;
	if( connState == Connection.NONE){
		$("#internetAccessButton").text('No Internet Access')
							    .button('refresh');
	}
	else{
		$("#internetAccessButton").text('Connected to ' + connState + " network" )
	    .button('refresh');
	}

});



//var coordinates = [];
var serviceId;

$(document).ready(function() {
    $(".serviceList").click(function(element) {
    	serviceId = element.innerHTML;
        navigator.geolocation.watchPosition(success, error, { timeout: 10000, frequency: 30000, enableHighAccuracy: true });
    });
});




function success(result)
{
	var coords = result.coords;
	var longitude = coords.longitude;
	var latitude = coords.latitude;
	//coordinates.push(coords);
	
	showPosition(longitude, latitude, serviceId);
}

function error(error){
	alert(error.code + " " + error.message);
}



function showPosition(longitude, latitude, serviceId)
{
	var canvas = document.getElementById('mapCanvasLookup');
	
	// Set the initial Lat and Long of the Google Map
	var myLatLng = new google.maps.LatLng(latitude, longitude);
    var destLatLng = getServiceLatLng(serviceId);
	var trackCoords = [];
	trackCoords.push(myLatLng);
	trackCoords.push(destLatLng);
	// Plot the GPS entries as a line on the Google Map
    var trackPath = new google.maps.Polyline({
      path: trackCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    
 // Google Map options
	var myOptions = {
     zoom: 15,
     center: myLatLng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(canvas, myOptions);
    // Apply the line to the map
    trackPath.setMap(map);	
    
    
    //following code is for plotting single point
	
    // Create the Google Map, set options
    //var map = new google.maps.Map(canvas, myOptions);
}





function getServiceLatLng(serviceId)
{
	switch(serviceId)
	{
	case 'Service 1':
		return new google.maps.LatLng(33.8587, 151.2140);
		
	case 'Service 2':
		return new google.maps.LatLng(34.8587, 152.2140);
		
	case 'Service 3':
		return new google.maps.LatLng(35.8587, 153.2140);
		
		default: return new google.maps.LatLng(33.8587, 151.2140);
	}
}



//function gps_distance(lat1, lon1, lat2, lon2)
//{
	// http://www.movable-type.co.uk/scripts/latlong.html
  //  var R = 6371; // km
  //  var dLat = (lat2-lat1) * (Math.PI / 180);
  //  var dLon = (lon2-lon1) * (Math.PI / 180);
  //  var lat1 = lat1 * (Math.PI / 180);
  //  var lat2 = lat2 * (Math.PI / 180);

   // var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
   //         Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
   // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   // var d = R * c;
    
   // return d;
//}








   // var trackCoords = [];
    
    // Add each GPS entry to an array
   // for(i=0; i<data.length; i++){
    //	trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    //}
    
    // Plot the GPS entries as a line on the Google Map
   // var trackPath = new google.maps.Polyline({
     // path: trackCoords,
     // strokeColor: "#FF0000",
     // strokeOpacity: 1.0,
     // strokeWeight: 2
    //});

    // Apply the line to the map
    //trackPath.setMap(map);
   
		
//});
