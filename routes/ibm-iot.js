var express = require('express')
  , router  = express.Router();

router.get('/', function(req, res, next) {
  var config = req.app.get('iotf_credentials');

  res.send(req.app.get('iotf_credentials'));
});

module.exports = router;