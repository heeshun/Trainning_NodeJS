'use strict';

var express = require('express');
var router = express.Router();

var auth = require('../controllers/authController');
router.post('/login', auth.authUser);
router.get('/logout', auth.userLogout);
router.post('/reset', auth.resetPassword);

module.exports = router;
