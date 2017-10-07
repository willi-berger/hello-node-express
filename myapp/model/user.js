/**
 * user model
 */

var mysql = require('mysql')


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
	console.log('UserModel.loadAll:');
	var connection = createConnection();

	connection.connect()
	connection.query('select id as id, first_name as firstName, last_name as lastName from persons', function (err, rows, fields) {
		console.log('query.callback');        
		if (err) {
            return callback(err);
        }

		var users = [];
		for (i = 0; i < rows.length; i++) {
		  console.log('user: id', rows[i].id , rows[i].firstName, rows[i].lastName);	
		  //users.push({id: rows[i].id, firstName: rows[i].firstName, lastName: rows[i].lastName});
		  users.push(rows[i]);
		}  
		
		callback(null, users);
	});
	connection.end()
};

/** load by Id*/
module.exports.load = function (id, callback) 
{
	console.log('UserModel.load id:'+id);
	var connection =createConnection();
	connection.connect()
	console.log('query');
	// TODO possible SQL Injection ??
	connection.query('select id as id, first_name as firstName, last_name as lastName from persons where id = ?', id, function (err, rows, fields) {
		console.log('query.callback');        
		if (err) {
            return callback(err);
        }

		for (i = 0; i < rows.length; i++) {
		  console.log('user: id', rows[i].id , rows[i].firstName, rows[i].lastName);	
		  callback(null, rows[i]);
		}  		
		
	});
	connection.end()
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

