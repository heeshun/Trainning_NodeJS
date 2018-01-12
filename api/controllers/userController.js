'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.create_new_user = function (req, res) {
  var new_user = new User(req.body);
  new_user.save(function (err, film) {
    if (err)
      return res.send(err);
    res.json({ data: film });
  });
};
