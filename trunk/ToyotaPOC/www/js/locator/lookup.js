

var MAX_POSITIONS = 50;
function ServicePosition(position, address, datetime)
{
	  this.position = position;
	  this.address = address;
	  this.datetime = datetime;	
}

window.addEventListener('load', function () {
	document.addEventListener("deviceready", function(){

		$("#getCurrentPos").on("click", function() {
		    
		     navigator.geolocation.watchPosition(success2, error2, { timeout: 60000, maximumAge:60000, enableHighAccuracy: true });
		  });
		
		// register onclick for save button
		$("#save").on("click", function() {
		    var serviceId = $("#serviceId").val();
		    savePosition(serviceId);
		 });
	
	},false); }, false);
		



		
function error2(error){
		alert(error.code + " " + error.message);
}


function success2(result)
{
   var coords = result.coords;	
   $("#selected").html(coords.longitude + " " + coords.latitude);
   $("#serviceId").val("some service id");
}





function savePosition(serviceId)
{
	  alert(serviceId);
	  var position = 'dummy';
	  var address = 'dummy';
	  
	  var positions = getPositions();
	  if (positions == null)
		  positions = [];
	  
	  positions.unshift(new ServicePosition(position, address, new Date()));
	 
	  if(positions.length >= MAX_POSITIONS)
		  positions.slice();
	  
	  var _db = window.localStorage;
	  _db.setItem('positions', JSON.stringify(positions));
}


function getPositions()
{
	var _db = window.localStorage;
	var positions = JSON.parse(_db.getItem('positions'));
	
	  if (positions == null)
		    positions = [];
		 
		  return positions;
}












