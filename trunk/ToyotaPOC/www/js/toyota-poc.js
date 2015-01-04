"use strict";var app=angular.module("ToyotaPOCApp",["ngRoute","settings","phonegap","viewtrips","logtrip","locator","update-details","SQLservices"]).run(["DB",function(){}]);app.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/home.html"}).when("/viewtrips",{templateUrl:"views/viewtrips.html",controller:"ViewTripsController"}).when("/logtrip",{templateUrl:"views/logtrip.html"}).when("/logtrip/gpstracker",{templateUrl:"views/logtrip.gpstracker.html",controller:"GPSTrackerController"}).when("/logtrip/manual",{templateUrl:"views/logtrip.manual.html",controller:"LogManualController"}).when("/updatedetails",{templateUrl:"views/update-details.html"}).when("/update/driver",{templateUrl:"views/driver.html",controller:"DriverController"}).when("/update/vehicle",{templateUrl:"views/vehicle.html",controller:"VehicleController"}).when("/locator",{templateUrl:"views/locator.html",controller:"LocatorController"})}]),app.run(["$rootScope","AppSettings","NetworkService","NotificationService",function(e,t,r,o){r.startMonitoring(),e.$on(t.OnNetworkStatusChange,function(t,r){e.NetworkReady=r,r||o.alert("Lost Network!","Network","Ok")})}]),angular.module("SQLservices",[]).factory("DB",["$q","$rootScope",function(e){var t={};return t.db=null,t.openDb=function(){t.db=void 0!==window.sqlitePlugin?window.sqlitePlugin.openDatabase({name:"ToyotaPOCDb"}):window.openDatabase("ToyotaPOCDb","1.0","database",-1)},t.createTables=function(){t.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS Vehicles (id integer primary key, vehiclerego text, created datetime)"),e.executeSql("CREATE TABLE IF NOT EXISTS Drivers (id integer primary key, firstname text, lastname text, address text, created datetime)"),e.executeSql("CREATE TABLE IF NOT EXISTS NatureOfTrip (id integer primary key, purpose text, created datetime)"),e.executeSql("CREATE TABLE IF NOT EXISTS Trips (id integer primary key, kmfrom integer, kmto integer, vehicleid integer, natureoftripid integer, driverid integer, datestart datetime, dateend datetime, locationfrom text, locationto text, created datetime, FOREIGN KEY(vehicleid) REFERENCES Vehicles(id), FOREIGN KEY(natureoftripid) REFERENCES NatureOfTrip(id), FOREIGN KEY(driverid) REFERENCES Drivers(id))")})},t.setupRecords=function(){t.db.transaction(function(e){e.executeSql("SELECT * FROM NatureOfTrip",[],function(e,r){r.rows.length<=0&&(e.executeSql("INSERT INTO NatureOfTrip (purpose, created) VALUES (?,?)",["Private Usage","2014-12-20"],function(){t.onSuccess,t.onError}),e.executeSql("INSERT INTO NatureOfTrip (purpose, created) VALUES (?,?)",["Business usage","2014-12-20"],function(){t.onSuccess,t.onError}))},t.onError),e.executeSql("SELECT * FROM Drivers",[],function(e,r){r.rows.length<=0&&(e.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)",["Yann","Randri","Oakton CLarence Street","2014-12-20"],function(){t.onSuccess,t.onError}),e.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)",["Jason","Woods","Oakton CLarence Street","2014-12-20"],function(){t.onSuccess,t.onError}),e.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)",["Sergei","Mishkarudny","Oakton CLarence Street","2014-12-20"],function(){t.onSuccess,t.onError}),e.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)",["Aiden","Zadeh","Oakton CLarence Street","2014-12-20"],function(){t.onSuccess,t.onError}))},t.onError),e.executeSql("SELECT * FROM Vehicles",[],function(e,r){r.rows.length<=0&&(e.executeSql("INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)",["AL33LL","2014-12-20"],function(){t.onSuccess,t.onError}),e.executeSql("INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)",["BD89GG","2014-12-20"],function(){t.onSuccess,t.onError}))},t.onError)})},t.fetchAll=function(e){var t=[];if(e.rows.length>0)for(var r=0;r<e.rows.length;r++)t.push(e.rows.item(r));return t},t.fetch=function(e){return e.rows.item(0)},t.onSuccess=function(){console.log("SQLite query was successful!")},t.onError=function(e,t){console.log("SQLite Error: "+t.message)},t.query=function(r,o){o="undefined"!=typeof o?o:[];var n=e.defer();return t.db.transaction(function(e){e.executeSql(r,o,function(e,t){n.resolve(t)},function(e,t){n.reject(t)})}),n.promise},t}]).factory("NatureOfTrip",["DB",function(e){var t=this;return t.all=function(){return e.query("SELECT * FROM NatureOfTrip").then(function(t){return e.fetchAll(t)})},t.getById=function(t){return e.query("SELECT * FROM NatureOfTrip WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t}]).factory("Vehicles",["DB",function(e){var t=this;return t.all=function(){return e.query("SELECT * FROM Vehicles").then(function(t){return e.fetchAll(t)})},t.getById=function(t){return e.query("SELECT * FROM vehicles WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.remove=function(t){return e.query("DELETE FROM vehicles WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.add=function(t){return e.query("INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)",[t,(new Date).getTime()]).then(function(t){return e.fetch(t)})},t}]).factory("Drivers",["DB",function(e){var t=this;return t.all=function(){return e.query("SELECT * FROM Drivers").then(function(t){return e.fetchAll(t)})},t.getById=function(t){return e.query("SELECT * FROM Drivers WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.remove=function(t){return e.query("DELETE FROM Drivers WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.add=function(t,r,o){return e.query("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)",[t,r,o,(new Date).getTime()]).then(function(t){return e.fetch(t)})},t}]).factory("Trips",["DB",function(e){var t=this;return t.all=function(){return e.query("SELECT * FROM Trips").then(function(t){return e.fetchAll(t)})},t.getById=function(t){return e.query("SELECT * FROM Trips WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.remove=function(t){return e.query("DELETE FROM Trips WHERE id = ?",[t]).then(function(t){return e.fetch(t)})},t.add=function(t,r,o,n,i,a,l,c,u){return e.query("INSERT INTO Trips (kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto, created) VALUES (?,?,?,?,?,?,?,?,?,?)",[t,r,o,n,i,a,l,c,u,(new Date).getTime()]).then(function(t){return e.fetch(t)})},t}]),angular.module("settings",[]).constant("AppSettings",{network_watch_interval:1e3,gps_error_threshold:5,map_zoom:12,OnNetworkStatusChange:"event::OnNetworkStatusChange"});var locatorControllers=angular.module("locator.controllers",[]);locatorControllers.controller("locatorCtrl",["$scope",function(){}]),angular.module("locator",["locator.controllers"]),angular.module("update-details",["driver","vehicle"]),angular.module("logtrip",["logtrip.manual","logtrip.gpstracker"]);var viewtripsControllers=angular.module("viewtrips.controllers",["SQLservices"]);viewtripsControllers.controller("ViewTripsController",["$q","$scope","Trips",function(e,t,r){t.loadData=function(){r.all().then(function(e){t.entries=e})},t.removeTrip=function(e){r.remove(e),t.loadData()},t.loadData()}]),angular.module("viewtrips",["viewtrips.controllers"]),angular.module("phonegap.geolocation",[]).factory("GeolocationService",["$rootScope","$log",function(e,t){var r=this;return r.watchId=null,r.trackingData=[],r.checkGeolocationAvailability=function(){return t.debug("cordovaGeolocationService.checkGeolocationAvailability."),navigator.geolocation?!0:(t.warn("Geolocation API is not available."),!1)},r.positionMoved=function(e){if(0==r.trackingData.length)return!0;var t=r.trackingData[r.trackingData.length-1];return!(e.coords.latitude==t.coords.latitude&&e.coords.longitude==t.coords.longitude)},{getCurrentPosition:function(o,n,i){t.debug("cordovaGeolocationService.getCurrentPosition.");var i=angular.extend({},{enableHighAccuracy:!0,timeout:1e4,maximumAge:1/0},i);r.checkGeolocationAvailability()&&navigator.geolocation.getCurrentPosition(function(t){o&&"function"==typeof o&&e.$apply(o(t))},function(t){n&&"function"==typeof n&&e.$apply(n(t))},i)},watchPosition:function(o,n,i){t.debug("cordovaGeolocationService.watchPosition."),r.trackingData=[];var i=angular.extend({},{enableHighAccuracy:!0,frequency:3e3},i);r.checkGeolocationAvailability()&&(r.watchId=navigator.geolocation.watchPosition(function(t){o&&"function"==typeof o&&r.positionMoved(t)&&(r.trackingData.push(t),e.$apply(o(t)))},function(t){n&&"function"==typeof n&&e.$apply(n(t))},i))},clearWatch:function(){return t.debug("cordovaGeolocationService.clearWatch."),r.checkGeolocationAvailability()&&r.watchId?(navigator.geolocation.clearWatch(r.watchID),r.watchID=null,r.trackingData):void 0}}}]),angular.module("phonegap",["phonegap.geolocation","phonegap.notification","phonegap.network"]),angular.module("phonegap.network",[]).factory("NetworkService",["$rootScope","$log","$interval","AppSettings",function(e,t,r,o){function n(){return navigator.network?navigator.network.connection.type!=Connection.NONE:!1}function i(){l=r(function(){var t=n();t!=c&&(e.$broadcast(o.OnNetworkStatusChange,t),c=t)},1e3)}function a(){r.cancel(l),l=void 0}var l,c=!1;return e.$on("$destroy",function(){l&&a()}),{networkReady:n,startMonitoring:i,stopMonitoring:a}}]),angular.module("phonegap.notification",[]).factory("NotificationService",["$rootScope",function(e){return{alert:function(t,r,o,n){navigator.notification.alert(t,function(){n&&"function"==typeof n&&e.$apply(function(){n()})},r,o)}}}]);var driverControllers=angular.module("driver.controllers",["SQLservices"]);driverControllers.controller("DriverController",["$q","$scope","Drivers",function(e,t,r){t.loadData=function(){r.all().then(function(e){t.entries=e})},t.addDriver=function(e,o,n){r.add(e,o,n),t.loadData()},t.removeDriver=function(e){r.remove(e),t.loadData()},t.loadData()}]),angular.module("driver",["driver.controllers"]);var vehicleControllers=angular.module("vehicle.controllers",["SQLservices"]);vehicleControllers.controller("VehicleController",["$q","$scope","Vehicles",function(e,t,r){t.loadData=function(){r.all().then(function(e){t.entries=e})},t.addVehicle=function(e){r.add(e),t.loadData()},t.removeVehicle=function(e){r.remove(e),t.loadData()},t.loadData()}]),angular.module("vehicle",["vehicle.controllers"]);var gpsTrackerControllers=angular.module("logtrip.gpstracker.controllers",["phonegap","settings"]);gpsTrackerControllers.controller("GPSTrackerController",["$scope","AppSettings","uiGmapGoogleMapApi","GeolocationService","$log",function(e,t,r,o,n){function i(r){n.debug("setupMap"),e.map={tripInProgress:!1,center:{latitude:r.coords.latitude,longitude:r.coords.longitude},zoom:t.map_zoom},e.startMarker=a(r),n.debug(JSON.stringify(r))}function a(e){return{coords:{latitude:e.coords.latitude,longitude:e.coords.longitude},options:{}}}function l(e){var t=0;if(e.length<=1)return 0;for(var r=0;r<e.length&&r!=e.length-1;r++)t+=c(e[r].coords.latitude,e[r].coords.longitude,e[r+1].coords.latitude,e[r+1].coords.longitude);var o=t.toFixed(2);return o}function c(e,t,r,o){var n=6371,i=(r-e)*(Math.PI/180),a=(o-t)*(Math.PI/180),e=e*(Math.PI/180),r=r*(Math.PI/180),l=Math.sin(i/2)*Math.sin(i/2)+Math.sin(a/2)*Math.sin(a/2)*Math.cos(e)*Math.cos(r),c=2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),u=n*c;return u}r.then(function(){o.getCurrentPosition(i)}),e.startTrip=function(){o.getCurrentPosition(function(t){n.debug(JSON.stringify(t)),e.map.tripInProgress||(e.startMarker=a(t),e.map.tripInProgress=!0),o.watchPosition(function(t){e.lastMarker=a(t)})},function(e){n.debug(JSON.stringify(e))})},e.endTrip=function(){var t=o.clearWatch();e.map.tripInProgress=!1,n.debug("total km:"+l(t))},e.simulateTracking=function(){$interval(function(){e.lastMarker.coords.latitude=e.lastMarker.coords.latitude+.01},3e3)}}]),angular.module("logtrip.gpstracker",["logtrip.gpstracker.controllers","uiGmapgoogle-maps"]).config(["uiGmapGoogleMapApiProvider",function(e){e.configure({key:"AIzaSyDT51isQ2Hrr9MDwnKAKjcVvaJfc9zId8I",v:"3.17"})}]);var edittripControllers=angular.module("edittrip.controllers",["SQLservices"]);edittripControllers.controller("EditTripController",["$q","$scope","Trips","Vehicles","Drivers","NatureOfTrip",function(e,t,r,o,n,i){t.loadVehicles=function(){o.all().then(function(e){t.allvehicles=e})},t.loadDrivers=function(){n.all().then(function(e){t.alldrivers=e})},t.loadNatureOfTrips=function(){i.all().then(function(e){t.allnatureoftrips=e})},t.addTrip=function(e,o,n,i,a,l,c,u,s){r.add(e,o,n,i,a,l,c,u,s),t.loadVehicles(),t.loadDrivers(),t.loadNatureOfTrips()},t.loadVehicles(),t.loadDrivers(),t.loadNatureOfTrips()}]),angular.module("edittrip",["edittrip.controllers"]);var logManualControllers=angular.module("logtrip.manual.controllers",["SQLservices"]);logManualControllers.controller("LogManualController",["$q","$scope","Trips","Vehicles","Drivers","NatureOfTrip",function(e,t,r,o,n,i){t.loadVehicles=function(){o.all().then(function(e){t.allvehicles=e})},t.loadDrivers=function(){n.all().then(function(e){t.alldrivers=e})},t.loadNatureOfTrips=function(){i.all().then(function(e){t.allnatureoftrips=e})},t.addTrip=function(e,o,n,i,a,l,c,u,s){r.add(e,o,n,i,a,l,c,u,s),t.loadVehicles(),t.loadDrivers(),t.loadNatureOfTrips()},t.loadVehicles(),t.loadDrivers(),t.loadNatureOfTrips()}]),angular.module("logtrip.manual",["logtrip.manual.controllers"]);