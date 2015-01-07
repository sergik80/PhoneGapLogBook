var serviceId;


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






function showPosition(longitude, latitude, serviceId)
{
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
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
	var positions = getPositions();
	
	for(i = 0; i < positions.length; i++)
	{
		if(serviceId == positions[i].address)
		{
			return new google.maps.LatLng(positions[i].latitude, positions[i].long);
		}
	}
	
  return ;
}




$(document).ready(function(){
	$("#lookupRedirect").on('click', function(){
		
		window.location = '../locator/serviceLookup.html';
	});
});





$(document).on("pageinit", "#favouriteServices", function () {
    //get entries from DB
    loadFavs();
});


function loadFavs()
{	
	  var positions = getPositions();
	  if (positions == null)
		  positions = [];
 	
	 
      for(var i = 0; i < positions.length; i++ )
      {
          var li = '<li class="listItem">' + positions[i].address + '</li>';
          $("#favServices").append(li);   
      }
      $("#favServices").listview('refresh');
     
      $('.listItem').on('click', function()
			  {
	            alert($(this).html());	
	            serviceId = $(this).html();
				navigator.geolocation.watchPosition(success, error, { timeout: 60000, maximumAge:50000 });
			  });
}


function success(result)
{
	var coords = result.coords;
	showPosition(coords.longitude, coords.latitude, serviceId);
}

function error(error){
	alert(error.code + " " + error.message);
}




function getPositions()
{
	var _db = window.localStorage;
	var positions = JSON.parse(_db.getItem('positions'));
	
	  if (positions == null)
		    positions = [];
		 
		  return positions;
}
