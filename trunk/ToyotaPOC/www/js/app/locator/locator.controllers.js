var locatorControllers = angular.module('locator.controllers', []);

locatorControllers.controller('LocatorController', function($scope) 
		{
	        var serviceId;
		    document.addEventListener("deviceready", function(){
				
			var connState = navigator.connection.type;
			if( connState == Connection.NONE){				
				$scope.networkStatus = "No Internet Access";
			}
			else{
				  $scope.networkStatus = 'Connected to ' + connState + " network";
			}
		});	
		    
		   document.addEventListener("pageinit", function(){			   
			   //get entries from DB
			    loadFavs();
		   });
			   
		    
		   $scope.init = function()
		   {
			   loadFavs();
		   }
		   
		   $scope.init();
	






function loadFavs()
{	
	  var positions = getPositions();
	  if (positions == null)
      positions = [];
 	        
      $scope.serviceList = positions;
}
      
      function getPositions()
      {
      	var _db = window.localStorage;
      	var positions = JSON.parse(_db.getItem('positions'));
      	
      	  if (positions == null)
      		    positions = [];
      		 
      		  return positions;
      }

      
      
 $scope.getRoute = function(id)
 { 
	serviceId = id;
	navigator.geolocation.watchPosition(success, error, { timeout: 60000, maximumAge:50000 });
 }      
      
      
      
      
      function ServicePosition(latitude,long, address, datetime)
      {
      	  this.latitude = latitude;
      	  this.address = address;
      	  this.long = long;
      	  this.datetime = datetime;
      }

      
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
      	
      	for(var i = 0; i < positions.length; i++)
      	{
      		if(serviceId == positions[i].address)
      		{
      			return new google.maps.LatLng(positions[i].latitude, positions[i].long);
      		}
      	}
      	
        return ;
      }
      
      
});  // end of controller







locatorControllers.controller('LookupController', function($scope) 
{
	var MAX_POSITIONS = 50;
	$scope.getCurrentPosition = function() {
		navigator.geolocation.getCurrentPosition(success2, error2, { timeout: 60000, maximumAge:60000, enableHighAccuracy: true });
	  }
	
	
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
            	$scope.latitude = latitude;
            	$scope.longitude = longitude;
            	$scope.address = results[1].formatted_address;
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
    	    title: 'Current position'});
    }

    
    
    
     $scope.saveCurrentPosition = function()
     {
    	  var latitude = $scope.latitude;
    	  var long = $scope.longitude;
    	  var address = $scope.address;
    	 	
    	  alert('saving '+ latitude + long + address);
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

     function ServicePosition(latitude,long, address, datetime)
     {
     	  this.latitude = latitude;
     	  this.address = address;
     	  this.long = long;
     	  this.datetime = datetime;
     }	
	
});// controller end
