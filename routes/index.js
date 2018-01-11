var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('film/list', { title: 'Express' });
});

router.get('/create', function (req, res, next) {
  res.end('film/create', { title: 'Express' });
});

module.exports = router;
