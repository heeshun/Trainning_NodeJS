'use strict';

var express = require('express');
var router = express.Router();

var cinema = require('../controllers/cinemaListController');
router.get('/cinemas/', cinema.list_all_film);
router.post('/createfilm/', cinema.create_new_film);

module.exports = router;
