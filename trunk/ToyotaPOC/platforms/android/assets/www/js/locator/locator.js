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


