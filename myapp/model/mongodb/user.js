/**
 * user model
 */

var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

var url = "mongodb://127.0.0.1:27017/mydb";



/** create user*/
module.exports.create = function (user, callback)
{
	console.log('UserModel.save user:' + JSON.stringify(user));
	var connection = createConnection();
	connection.connect()
	connection.query('insert into persons (first_name, last_name) values (?, ?)', 
		[user.firstName, user.lastName], 
		function (err, rows, fields) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	connection.end()	
}


/** save user*/
module.exports.save = function (user, callback) 
{
	console.log('UserModel.save user:' + JSON.stringify(user));
	var connection = createConnection();
	connection.connect()
	connection.query('update persons set first_name = ?, last_name = ? where id = ?', 
		[user.firstName, user.lastName, user.id], 
		function (err, rows, fields) {
			if (err) {
				return callback(err);
			}
			callback(null);
		});
	connection.end()	
}

/** load all*/
module.exports.loadAll = function (callback) 
{
	console.log('MongoDb/UserModel.loadAll:');

	MongoClient.connect(url, function(err, db) {
		if (err) callback(err);
		var dbo = db.db("mydb");
		dbo.collection("persons").find({}).toArray(function(err, result) {
		  if (err) callback(err);
		  console.log(result);
		  db.close();
		  // map and use mongodb _id as our model id
		  callback(null, result.map(p => {pm = p; pm['id'] = p._id; return pm;}));
		});
	  }); 

};

/** load by Id*/
module.exports.load = function (id, callback) 
{
	console.log('MongoDb/UserModel.load id: ' + id);
	MongoClient.connect(url, function(err, db) {
		if (err) callback(err);
		var dbo = db.db("mydb");
		var o_id = new ObjectID(id);
		dbo.collection("persons").find({'_id':o_id }).toArray(function(err, result) {
		  if (err) callback(err);
		  console.log(result);
		  db.close();
		  // map and use mongodb _id as our model id
		  callback(null, result.map(p => {pm = p; pm['id'] = p._id; return pm;})[0]);
		});
	  }); 

};

function createConnection() {
	// TODO hardcoded DB connection settings read from a configuration
	return  mysql.createConnection({
		host     : 'localhost',
		user     : 'willie',
		password : 'willie',
		database : 'willie'
	});

}

