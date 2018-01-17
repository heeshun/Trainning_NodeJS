'use strict';

var mongoose = require('mongoose'),
  Film = mongoose.model('Films');
var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
exports.listAllFilm = function (req, res) {
  Film.find({}, function (err, film) {
    if (err)
      return res.send(err);
    res.json(film);
  });
};

exports.createNewFilm = function (req, res) {
  var new_film = new Film(req.body);
  new_film.save(function (err, film) {
    if (err)
      return res.send(err);
    res.json({ data: film });
  });
};

exports.updateFilm = function (req, res) {
  Film.findOne({ _id: req.body._id }, function (err, film) {
    if (err)
      return res.send({ message: err });
    if (!film)
      return res.send({ message: 'Phim không tồn tại' });
    film.name = req.body.name;
    film.author = req.body.author;
    film.createDate = req.body.createDate;
    film.content = req.body.content;
    film.typeFilm = req.body.typeFilm;
    film.filmImage = req.body.filmImage;
    film.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'Film Updated' });
    });
  });
};

const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());

exports.uploadImage = function (req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public/images/upload-images');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name

  var renameFile = '';
  form.on('file', function (field, file) {
    renameFile = (new Date().getTime()) + file.name;
    fs.rename(file.path, path.join(form.uploadDir, renameFile));
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    res.json({ path: './images/upload-images/' + renameFile });
  });
  // parse the incoming request containing the form data
  form.parse(req);
};

