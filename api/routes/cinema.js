'use strict';

var express = require('express');
var router = express.Router();

var cinema = require('../controllers/cinemaController');
router.get('/', cinema.listAllFilm);
router.post('/create', cinema.createNewFilm);
router.put('/update', cinema.updateFilm);
router.post('/upload', cinema.uploadImage);

module.exports = router;
