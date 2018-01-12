'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  createDate: {
    type: String,
    default: ''
  },
  typeFilm: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Films', FilmSchema);
