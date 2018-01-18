'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');
const nodemailer = require('nodemailer');
var randomstring = require('randomstring');
var randomPass = '';

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

exports.resetPassword = function (req, res) {
  var email = req.body.email;
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return res.send({ err: 'Server error' });
    } else if (!user) {
      return res.send({ err1: 'Email này chưa được đăng kí' });
    } else {
      randomPass = randomstring.generate(7);
      var ciphertext = CryptoJS.AES.encrypt(randomPass, email).toString();
      user.password = ciphertext;
      user.save(function (err) {
        if (err)
          res.send(err);
        res.json({ message: 'Đã thay đổi mật khẩu' });
        return randomPass;
      });
    }
  });
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.user, // generated ethereal user
        pass: config.pass // generated ethereal password
      }
    });
    transporter.verify(function (error, success) {
      if (error) {
        return res.json({ error: 'Server lỗi' });
      } else {
        console.log('Server is ready to take our messages');
      }
    });
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Future-Cinema 👻"', // sender address
      to: req.body.email, // list of receivers
      subject: 'Mật khẩu đặt lại của bạn', // Subject line
      text: 'Chào bạn, đây là mật khẩu mới của bạn ' + randomPass + '.'
      // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.json({ error: 'Server lỗi' });
      }
    });
  });
};
