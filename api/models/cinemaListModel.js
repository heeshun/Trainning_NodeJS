'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    type_film: {
        type: String,
        default: ''
    },
    decription: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Films', FilmSchema);