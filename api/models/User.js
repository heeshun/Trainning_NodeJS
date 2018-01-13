'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: 0
  },
  gender: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Users', UserSchema);
