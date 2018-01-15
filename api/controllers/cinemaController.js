'use strict';

var mongoose = require('mongoose'),
  Film = mongoose.model('Films');

exports.listAllFilm = function (req, res) {
  Film.find({}, function (err, film) {
    if (err)
      return res.send(err);
    res.json(film);
  });
};

exports.createNewFilm = function (req, res) {
  var new_film = new Film(req.body);
  new_film.save(function (err, film) {
    if (err)
      return res.send(err);
    res.json({ data: film });
  });
};

exports.updateFilm = function (req, res) {
  Film.findOne({ _id: req.body._id }, function (err, film) {
    if (err)
      return res.send({ message: err });
    if (!film)
      return res.send({ message: 'Phim không tồn tại' });
    film.name = req.body.name;
    film.author = req.body.author;
    film.createDay = req.body.createDay;
    film.content = req.body.content;
    film.typeFilm = req.body.typeFilm;
    film.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'Film Updated' });
    });
  });
};
