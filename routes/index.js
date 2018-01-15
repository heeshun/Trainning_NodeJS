var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('film/list', { title: 'Express', userLoggingID: (req.session.user ? req.session.user._id : '') });
});

router.get('/create', function (req, res, next) {
  if (req.session.user) {
    res.render('film/create', { title: 'Express', userLoggingID: (req.session.user ? req.session.user._id : '') });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
