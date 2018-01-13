'use strict';

var express = require('express');
var router = express.Router();

var auth = require('../controllers/authController');
router.post('/login', auth.authUser);

module.exports = router;
