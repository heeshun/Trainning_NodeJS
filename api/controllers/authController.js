'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'); var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

exports.authUser = function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return res.send({ err: 'Server error' });
    } else if (!user) {
      return res.send({ err1: 'Email này không tồn tại' });
    } else {
      var decryptedPass = CryptoJS.AES.decrypt(user.password, user.email).toString(CryptoJS.enc.Utf8);
      if (decryptedPass == '') {
        return res.send({ err2: 'Server lỗi' });
      }
      if (decryptedPass === pass) {
        var token = jwt.sign({ email: user.email }, config.secretSession, {
          expiresIn: 60 * 30
        });
        req.session.user = user;
        req.session.token = token;
        res.send({ message: 'Success', user: user });
      } else {
        res.send({ message1: 'Error password' });
      }
    }
  });
};

exports.userLogout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.send({ err: 'Server lỗi' });
    } else {
      res.send({ message: 'Đăng xuất thành công' });
    }
  });
};
