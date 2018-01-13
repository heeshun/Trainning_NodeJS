'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var config = require('../../config');
var CryptoJS = require('crypto-js');

exports.createNewUser = function (req, res) {
  var ciphertext = CryptoJS.AES.encrypt(req.body.password, config.secret).toString();
  var newUser = new User(req.body);
  newUser.password = ciphertext;
  newUser.save(function (err, user) {
    if (err)
      return res.send({ err: 'Server error' });
    res.json({ message: 'Create success', user: user });
  });
};
