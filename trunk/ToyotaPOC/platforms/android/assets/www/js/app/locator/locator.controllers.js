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
		    
			// define list load function
			$scope.loadFavs = function()
			{	
				var positions = getPositions();
			   	if (positions == null)
			    positions = [];
			    	        
			    $scope.serviceList = positions;
			}
		    
			
		   document.addEventListener("pageinit", function(){			   
			   //get entries from DB
			    $scope.loadFavs();
		   });
			   
		      
		   $scope.init = function()
		   {
			   $scope.loadFavs();
		   }
		   
		   $scope.init();
	







      
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
      	canvas.style.display = 'block';
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
      
      
		$scope.removeServiceStation = function(address) {
			
		    var positions = getPositions();
		    	 	  
		    for(var i = 0; i < positions.length; i++)
		    {
		    	if(positions[i].address == address)
		    		positions.splice(i,1);//remove element at position i
		    }
		    	 	  
		    var _db = window.localStorage;
		    _db.setItem('positions', JSON.stringify(positions));
		   		    
		    $scope.loadFavs();
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
        canvas.style.display = 'block';
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
    	 	
    	 	  var positions = getPositions();
    	 	  if (positions == null)
    	 		  positions = [];
    	 	  
    	 	  if(! $scope.favExists(address, positions))
    	 	  {
    	 	     positions.unshift(new ServicePosition(latitude,long, address, new Date()));
    	 	 
    	 	     if(positions.length >= MAX_POSITIONS)
    	 		    positions.slice();
    	 	  
    	 	     var _db = window.localStorage;
    	 	     _db.setItem('positions', JSON.stringify(positions));
    	 	     alert('Added ' +  positions[0].address + ' to favourites'); 
    	 	  }
    	 	  else // this address is already in the favourites
    	 	  {
    	 		  alert('Address ' + address + ' has been saved previously');
    	 	  }
     }
    
     $scope.favExists = function(address, positions)
     {
    	 for(var i = 0; i < positions.length; i++)
    	 {
    		 if(positions[i].address == address) return true;
    	 }
    	 
    	 return false;
     }
     

     function getPositions()
     {
     	var _db = window.localStorage;
     	var positions = JSON.parse(_db.getItem('positions'));
     	
     	  if (positions == null)
     		    positions = [];
     		 
     		  return positions;
      }

     
     
      $scope.searchStations = function(radius)
      {
    	  navigator.geolocation.getCurrentPosition(
    			  function(result)
    			  {
    				  var coords = result.coords;
    				  var myLat = coords.latitude;
    				  var myLon = coords.longitude;
    			      printCurrentPosition(coords);// print current address and long lat
    			      
    			      var canvas = document.getElementById('lookupCanvas');	
    			      canvas.style.display = 'block';
    			      // Set the initial Lat and Long of the Google Map
    			      var myLatLng = new google.maps.LatLng(myLat, myLon);   
    			        
    			        
    			      // Google Map options
    			      var myOptions = 
    			      {
    			        zoom: 15,
    			        center: myLatLng,
    			        mapTypeId: google.maps.MapTypeId.ROADMAP
    			      };

    			       var mapBounds = new google.maps.LatLngBounds();// create bounds obj
    			       var map = new google.maps.Map(canvas, myOptions);
    			       var toyotaStations = $scope.getToyotaStationsWithinRadius(radius, myLat, myLon); 
    			   
    			    	for(var i = 0; i < toyotaStations.length; i++)
    			    	{
    			    		var marker = new google.maps.Marker({
    			    		position: toyotaStations[i],
    			    	    map: map,
    			    	    title: 'Current position'});
    			    		
    			    		mapBounds.extend(toyotaStations[i]);
    			    	}
    			      map.fitBounds(mapBounds);
    			  
    			  }, 
    			  
    			  function()
    			  {
    				  alert('failed to read current position');
    			  }, 
    	
    			  { timeout: 60000, maximumAge:60000, enableHighAccuracy: true }
    			  
    	  );}

      
      
      $scope.getToyotaStationsWithinRadius = function(radius, myLat, myLon)
      {
    	  var stations = getPositions();// change to retrieve data from database
    	  var selectedStations = [];
    	  
    	  for(var i = 0; i < stations.length; i++)
    	  {
    		  var destLat = stations[i].latitude;
    	      var destLon = stations[i].long;
    		 
    	      var distance = getDistance(myLat, myLon, destLat, destLon);
    		  if(distance <= radius)
    		  {
    			  selectedStations.push(new google.maps.LatLng(destLat, destLon));
    		  }
    	  }

    	  return selectedStations;
      }
     
     
      
      function getDistance(lat1, lon1, lat2, lon2)
      {

    	 var R = 6371; // km
    	 var dLat = (lat2 - lat1) * (Math.PI / 180);
    	 var dLon = (lon2 - lon1) * (Math.PI / 180);
    	 var lat1 = lat1 * (Math.PI / 180);
    	 var lat2 = lat2 * (Math.PI / 180);

    	 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    	              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    	 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    	 var d = R * c;
    	 
    	 return d.toFixed(2);    	  
      }
      
      
      
      
      
      
      
     
     function ServicePosition(latitude,long, address, datetime)
     {
     	  this.latitude = latitude;
     	  this.address = address;
     	  this.long = long;
     	  this.datetime = datetime;
     }	
	
});// controller end
