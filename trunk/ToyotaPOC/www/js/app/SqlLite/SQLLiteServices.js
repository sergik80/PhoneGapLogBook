angular.module('SQLservices', []).factory('DB', ['$q','$rootScope',  function($q, $rootScope) {

	var self = {};
	self.db = null;

	self.openDb = function() {
		if (window.sqlitePlugin !== undefined) {
			self.db = window.sqlitePlugin.openDatabase({name: "ToyotaPOCDb"});
	    } else {
			self.db = window.openDatabase("ToyotaPOCDb", '1.0', 'database', -1);
	    }
	}

	self.createTables = function(){
		self.db.transaction(function(tx) {
	        tx.executeSql('CREATE TABLE IF NOT EXISTS Vehicles (id integer primary key, vehiclerego text, created datetime)');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS Drivers (id integer primary key, firstname text, lastname text, address text, created datetime)');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS NatureOfTrip (id integer primary key, purpose text, created datetime)');
	        tx.executeSql('CREATE TABLE IF NOT EXISTS Trips (id integer primary key, kmfrom integer, kmto integer, vehicleid integer, natureoftripid integer, driverid integer, datestart datetime, dateend datetime, locationfrom text, locationto text, created datetime, FOREIGN KEY(vehicleid) REFERENCES Vehicles(id), FOREIGN KEY(natureoftripid) REFERENCES NatureOfTrip(id), FOREIGN KEY(driverid) REFERENCES Drivers(id))');
	    });
	}

	self.setupRecords = function(){
		self.db.transaction(function(tx) {
	    	tx.executeSql(
	    			'SELECT * FROM NatureOfTrip',
	    			[],
	    			function (tx,result){
	    				if(result.rows.length<=0)
	    				{
	    				    tx.executeSql("INSERT INTO NatureOfTrip (purpose, created) VALUES (?,?)", ["Private Usage", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				    tx.executeSql("INSERT INTO NatureOfTrip (purpose, created) VALUES (?,?)", ["Business usage", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				}
	    			},
	    			self.onError);
	    	
	    	tx.executeSql(
	    			'SELECT * FROM Drivers',
	    			[],
	    			function (tx,result){
	    				if(result.rows.length<=0)
	    				{
	    					tx.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)", ["Yann", "Randri","Oakton CLarence Street", "2014-12-20"], function(tx, res) {
	    						self.onSuccess,
	    						self.onError
	    				      });
	    				    tx.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)", ["Jason", "Woods","Oakton CLarence Street", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				    tx.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)", ["Sergei", "Mishkarudny","Oakton CLarence Street", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				    tx.executeSql("INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)", ["Aiden", "Zadeh","Oakton CLarence Street", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				}
	    			},    	
	    			self.onError);
	    	
	    	tx.executeSql(
	    			'SELECT * FROM Vehicles',
	    			[],
	    			function (tx,result){
	    				if(result.rows.length<=0)
	    				{
	    				    tx.executeSql("INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)", ["AL33LL", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				    tx.executeSql("INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)", ["BD89GG", "2014-12-20"], function(tx, res) {
	    				    	self.onSuccess,
	    				    	self.onError
	    				      });
	    				}
	    			},    	
	    			self.onError);
	    });
	}

	
	self.fetchAll = function(result) {
	    var output = [];

	    if(result.rows.length>0)
	    {	
		    for (var i = 0; i < result.rows.length ; i++) {
		        output.push(result.rows.item(i));
		    }
	    }
	    
	    return output;
	};

	self.fetch = function(result) {
	    return result.rows.item(0);
	};

	self.onSuccess = function(tx, r) {
	    console.log("SQLite query was successful!");
	}

	self.onError = function(tx, e) {
	    console.log("SQLite Error: " + e.message);
	}
 
	self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) 
        {
            transaction.executeSql(
            		query, 
            		bindings, 
            		function(transaction, result) {deferred.resolve(result);}, 
            		function(transaction, error) {deferred.reject(error);}
            		);
    	});
 
    	return deferred.promise;
	};
 
	return self;
	
}])
.factory('NatureOfTrip', function(DB) {
    var natureOfTrip = this;
    
    natureOfTrip.all = function() {
        return DB.query('SELECT * FROM NatureOfTrip')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    natureOfTrip.getById = function(id) {
        return DB.query('SELECT * FROM NatureOfTrip WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    return natureOfTrip;
})
.factory('Vehicles', function(DB) {
    var vehicles = this;
    
    vehicles.all = function() {
        return DB.query('SELECT * FROM Vehicles')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    vehicles.getById = function(id) {
        return DB.query('SELECT * FROM vehicles WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    vehicles.remove = function(id) {
        return DB.query('DELETE FROM vehicles WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    vehicles.add = function(registration) {
        return DB.query('INSERT INTO Vehicles (vehiclerego, created) VALUES (?,?)', [registration,(new Date().getTime())])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return vehicles;
})
.factory('Drivers', function(DB) {
    var drivers = this;
    
    drivers.all = function() {
        return DB.query('SELECT * FROM Drivers')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    drivers.getById = function(id) {
        return DB.query('SELECT * FROM Drivers WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    drivers.remove = function(id) {
        return DB.query('DELETE FROM Drivers WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    drivers.add = function(firstname, lastname,address) {
        return DB.query('INSERT INTO Drivers (firstname, lastname, address, created) VALUES (?,?,?,?)', [firstname,lastname,address,(new Date().getTime())])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return drivers;
})
.factory('Trips', function(DB) {
    var trips = this;
    
    trips.all = function() {
        return DB.query('SELECT * FROM Trips')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    
    trips.getById = function(id) {
        return DB.query('SELECT * FROM Trips WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    trips.remove = function(id) {
        return DB.query('DELETE FROM Trips WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };
    
    trips.add = function(kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto) {
        return DB.query('INSERT INTO Trips (kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto, created) VALUES (?,?,?,?,?,?,?,?,?,?)', [kmfrom, kmto, vehicleid, natureoftripid, driverid, datestart, dateend, locationfrom, locationto,(new Date().getTime())])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return trips;
});


