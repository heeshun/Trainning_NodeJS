'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var config = require('../../config');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


exports.createNewUser = function (req, res) {
  var email = req.body.email;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return res.send({ err: 'Server lỗi' });
    } else if (!user) {
      var ciphertext = CryptoJS.AES.encrypt(req.body.password, req.body.email).toString();
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
        res.send({ message: 'Success', user: user });
      });
    } else {
      return res.send({ err1: 'Email này đã tồn tại' });
    }
  });
};

exports.getUser = function (req, res) {
  User.findOne({ _id: req.params.id }, function (err, user) {
    if (err) {
      return res.send({ err: 'Server error' });
    }
    res.json({ message: 'Login Successfully', user: user });
  });
};

exports.resetPassword = function (req, res) {

};
