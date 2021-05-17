'use strict';
var mongoose = require('mongoose');
Movie = mongoose.model('Movies');

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