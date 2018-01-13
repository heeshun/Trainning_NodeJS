'use strict';

var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');
router.post('/create', user.createNewUser);

module.exports = router;
