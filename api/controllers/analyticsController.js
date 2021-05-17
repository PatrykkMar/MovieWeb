'use strict';
var mongoose = require('mongoose');
Movie = mongoose.model('Movies');
Cast = mongoose.model('Cast');

exports.highest_box_office = function(req, res) {
    Movie.find({}).sort({"Boxoffice": "desc"}).limit(parseInt(req.params.count)).exec(function (err, movie) {
      if (err) {
          res.status(500).send(err);
      }
      else {
          res.json(movie);
      }
  }); 
};

exports.highest_rated_actors = function(req, res) {
  Cast.find({}).sort({"averageRating": "desc"}).limit(parseInt(req.params.count)).exec(function (err, movie) {
    if (err) {
        res.status(500).send(err);
    }
    else {
        res.json(movie);
    }
  });
};

exports.highest_rated_movies_by_category = function(req, res) {
  var field = {"User":"averageUserRating", "Critic":"averageUserRating"}[req.params.type];
  Movie.find({"category": req.params.category}).sort({field: "desc"}).limit(parseInt(req.params.count)).exec(function (err, movie) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(movie);
    }
  });
};