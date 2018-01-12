'use strict';

var express = require('express');
var router = express.Router();

var cinema = require('../controllers/userController');
// router.get('/cinemas/', cinema.list_all_film);
router.post('/create-user', cinema.create_new_user);

module.exports = router;
