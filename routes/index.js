var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/credentials', function(req, res) {
  var basicConfig = req.app.get('iot_credentials');
  
	res.json(basicConfig);
});

module.exports = router;