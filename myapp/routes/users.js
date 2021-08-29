var express = require('express');
var router = express.Router();

var userModel = require('../model/mongodb/user');


const util = require("util");

/**
 * POST create/update user
 */
router.post('/save', function (req, res, next) {
	
	console.log("** users.post id:"+util.inspect(req.body));
	if (req.body.id !== '') {
		console.log("* update user" + req.body.id);
		
		userModel.save(req.body, function (err, result) {
			if (err) throw err;			
			res.redirect('/users');
		});
		
		
		
	} else {
		console.log("* create new user");
		userModel.create(req.body, function (err, result) {
			if (err) throw err;

			res.redirect('/users');

		});
		
	}
})

/**
 *  GET add user 
 */
router.get('/add/', function (req, res) {
	console.log('** add new user');

	res.render('user', { 
		'title': 'Hello Express - New User ',
		'user': {id: '', firstName: '', lastName:''}
	  });
})


/**
 *  GET user details
 */
router.get('/:userId', function (req, res) {
	console.log('** get User details');
	userModel.load(req.params.userId, function(err, user) {
		
		if (err) 
			throw err;

		
		res.render('user', { 
			'title': 'Hello Express - User #'+req.params.userId,
			'user': user
		  });
	  });
})


/** 
 * GET users listing. 
 */
router.get('/', function(req, res, next) {
	
	console.log('**  users - list');
	userModel.loadAll(function(err, users) {

		if (err) 
			throw err;

		res.render('users', { 
		  'title': 'Hello Express - Users',
		  'users': users
		  });
	  });
});

module.exports = router;
