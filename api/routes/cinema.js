'use strict';

var express = require('express');
var router = express.Router();

var cinema = require('../controllers/cinemaController');
router.get('/', cinema.listAllFilm);
router.post('/create', cinema.createNewFilm);

module.exports = router;
