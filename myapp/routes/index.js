var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
	  title: 'Hello Express - Index',
	  items: ['A1', 'B1', 'C1'] });
});

module.exports = router;
