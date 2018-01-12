'use strict';

var mongoose = require('mongoose'),
  Film = mongoose.model('Films');

exports.list_all_film = function (req, res) {
  Film.find({}, function (err, film) {
    if (err)
      return res.send(err);
    res.json(film);
  });
};

exports.create_new_film = function (req, res) {
  var new_film = new Film(req.body);
  new_film.save(function (err, film) {
    if (err)
      return res.send(err);
    res.json({ data: film });
  });
};
