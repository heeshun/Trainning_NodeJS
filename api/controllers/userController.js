'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var config = require('../../config');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');


exports.createNewUser = function (req, res) {
  var ciphertext = CryptoJS.AES.encrypt(req.body.password, config.secret).toString();
  var newUser = new User(req.body);
  newUser.password = ciphertext;
  newUser.save(function (err, user) {
    if (err)
      return res.send({ err: 'Server error' });
    var token = jwt.sign({ email: user.email }, config.secretSession, {
      expiresIn: 60 * 30
    });
    req.session.user = user;
    req.session.token = token;
    console.log(req.session.token);
    res.send({ message: 'Success', user: user });
  });
};

exports.getUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      console.log(err);
      return res.send({ err: 'Server error' });

    }
    res.json({ message: 'Login Successfully', user: user });
  });
};
