var MAX_POSITIONS = 50;
function ServicePosition(latitude,long, address, datetime)
{
	  this.latitude = latitude;
	  this.address = address;
	  this.long = long;
	  this.datetime = datetime;
}

window.addEventListener('load', function () {
	document.addEventListener("deviceready", function(){

		$("#getCurrentPos").on("click", function() {
			navigator.geolocation.getCurrentPosition(success2, error2, { timeout: 60000, maximumAge:60000, enableHighAccuracy: true });
		  });
		
		// register onclick for save button
		$("#save").on("click", function() {
		    savePosition();
		 });
	
	},false); }, false);
		



		
function error2(error){
		alert(error.code + " " + error.message);
}


function success2(result)
{
   var coords = result.coords;	
   printCurrentPosition(coords);
   mapCurrentPosition(coords);
}

function printCurrentPosition(coords){
	
	var latitude = coords.latitude;
    var longitude = coords.longitude;
	var myLatLng = new google.maps.LatLng(latitude, longitude); 
	var geocoder = new google.maps.Geocoder();
	   
    geocoder.geocode( { 'latLng': myLatLng}, function(results, status) {        
        if (status == google.maps.GeocoderStatus.OK) 
        {       	
        	$("#latitude").html(latitude);
        	$("#longitude").html(longitude);
            $("#address").html(results[1].formatted_address);
            $("#addrDetails").slideDown('slow');
        }
    
    });

	
}


function mapCurrentPosition(coords)
{
	var latitude = coords.latitude;
    var longitude = coords.longitude;
    var canvas = document.getElementById('lookupCanvas');	
	// Set the initial Lat and Long of the Google Map
	var myLatLng = new google.maps.LatLng(latitude, longitude);   
    
    
 // Google Map options
	var myOptions = {
     zoom: 15,
     center: myLatLng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
    };

   
	var map = new google.maps.Map(canvas, myOptions);
	var marker = new google.maps.Marker({
		position: myLatLng,
	    map: map,
	    title: 'Current osition'});
}



function savePosition()
{
 var latitude = $("#latitude").html();
 var long = $("#longitude").html();
 var address = $("#address").html();
	
	  var positions = getPositions();
	  if (positions == null)
		  positions = [];
	  
	  positions.unshift(new ServicePosition(latitude,long, address, new Date()));
	 
	  if(positions.length >= MAX_POSITIONS)
		  positions.slice();
	  
	  var _db = window.localStorage;
	  _db.setItem('positions', JSON.stringify(positions));
	  alert('saved' +  JSON.stringify(positions));
}


function getPositions()
{
	var _db = window.localStorage;
	var positions = JSON.parse(_db.getItem('positions'));
	
	  if (positions == null)
		    positions = [];
		 
		  return positions;
}







