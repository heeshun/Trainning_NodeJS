'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var config = require('../../config.js');

exports.get_user = function (req, res) {
  var getUser = new User(req.body);
  getUser.save(function (err, user) {
    if (err)
      return res.send(err);
    res.json(user);
  });
};

exports.create_new_user = function (req, res) {
  var CryptoJS = require('crypto-js');
  var ciphertext = CryptoJS.AES.encrypt(req.body.password, req.body.id).toString();
  var newUser = new User(req.body);
  newUser.password = ciphertext;
  newUser.save(function (err, user) {
    if (err)
      return res.send({ err: 'Server error' });
    res.json({ message: 'Create success', user: user });
  });
};
