'use strict';
/*---------------MOVIE----------------------*/
var mongoose = require('mongoose'),
    Movie = mongoose.model('Movies');

exports.list_movies = function (req, res) {
    Movie.find({}, function (err, movie) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(movie);
        }
    });
};

exports.create_new_movie = function (req, res) {
    var new_movie = new Movie(req.body);

    new_movie.save(function (err, movie) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(movie);
        }
    });
};

exports.get_movie = function (req, res) {
    Movie.findById({ _id: mongoose.Types.ObjectId(req.params.movieId) }, function (err, movie) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(movie);
        }
    });
};

exports.update_movie = function (req, res) {
    // authorization: check if Critic or Admin if not: res.status(403); "an access token is valid, but requires more privileges"
    Movie.findOneAndUpdate({ _id: req.params.movieId }, req.body, { new: true }, function (err, movie) {
        if (err) {
            if (err.name == 'ValidationError') {
                res.status(422).send(err);
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            res.json(movie);
        }
    });
};


exports.delete_movie = function (req, res) {
    //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    Movie.deleteOne({ _id: req.params.movieId }, function (err, movie) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json({ message: 'Movie successfully deleted' });
        }
    });
};

exports.search_movies = function (req, res) {
    var query = {};

    if (req.query.title) {
        query.title = req.query.title;
    }

    if (req.query.q) {
        query.$text = {$search: req.query.q};
    }

    Movie.find(query)
        .exec(function (err, movie) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(movie);
            }
        });
};