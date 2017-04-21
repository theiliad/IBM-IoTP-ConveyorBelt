var express = require('express')
  , router  = express.Router()
  , Client  = require('ibmiotf');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;