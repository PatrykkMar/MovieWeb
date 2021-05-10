'use strict';
/*---------------MOVIE----------------------*/
var mongoose = require('mongoose'),
    Movie = mongoose.model('Movies');

exports.list_movies = function(req, res) {
    Movie.find({}, function(err, users) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(users);
        }
    });
};

exports.create_new_movie = function(req, res) {
    var new_movie = new Movie(req.body);

    new_movie.save(function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(user);
        }
    });
};