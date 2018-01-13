'use strict';

var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');
router.get('/get-user/', user.get_user);
router.post('/create-user', user.create_new_user);

module.exports = router;
