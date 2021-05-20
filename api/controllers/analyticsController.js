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
  var field = {"User":"averageUserRating", "Critic":"averageCriticsRating"}[req.params.type];
  Movie.find({"category": req.params.category}).sort({field: "desc"}).limit(parseInt(req.params.count)).exec(function (err, movie) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(movie);
    }
  });
};

exports.highest_rated_movies_by_gender = function(req, res) {
  var gender = req.params.gender;
  var commentType = {"Critic": "criticsComments", "User": "userComments"}[req.params.type];
  console.log(commentType);
  var clearedMovies = [];
  var movieRatings = {};
  Movie.find({}, function (err, movies) {
    movies.forEach(movie => {
      var comments = [];
      movie[commentType].forEach(comment => {
        if(comment["author"]["gender"] == gender){
          comments.push(comment);
        }
      })
      var movieCopy = movie;
      movieCopy[commentType] = comments;
      clearedMovies.push(movieCopy);
    });
    clearedMovies.forEach(movie => {
      var rating = 0;
      var numberOfComments = movie[commentType].length;
      movie[commentType].forEach(comment => {
        rating += comment.stars;
      });
      rating = (numberOfComments != 0) ? rating/numberOfComments : 0;
      console.log(movie);
      movieRatings[movie._id] = rating;
    });

    var items = Object.keys(movieRatings).map(function(key) {
      return [key, movieRatings[key]];
    });


    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    var returnMovies = [];

    items.forEach(movieId => {
      clearedMovies.forEach(movie => {
        if(movie["_id"] == movieId[0]){
          returnMovies.push(movie);
        }
      });
    });
    res.json(returnMovies);
  });
}

exports.highest_rating_low_boxoffice = function(req, res) {
  Movie.aggregate()
    .group({"_id": null, "average": {"$avg": "$Boxoffice"}})
    .exec(function (err, averageBoxOffice){
      Movie.find({"Boxoffice": {$lte: averageBoxOffice[0].average}}).sort({"averageRating": "desc"}).limit(parseInt(req.params.count)).exec(function (err, movies) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    else {
		  res.json(movies);
	    }
    });
  });
};

exports.lowest_rating_high_boxoffice = function(req, res) {
  Movie.aggregate()
	.group({"_id": null, "average": {"$avg": "$Boxoffice"}})
	.exec(function (err, averageBoxOffice){
	  Movie.find({"Boxoffice": {$gte: averageBoxOffice[0].average}}).sort({"averageRating": "asc"}).limit(parseInt(req.params.count)).exec(function (err, movies) {
		if (err) {
		  res.status(500).send(err);
		}
		else {
		  res.json(movies);
		}
	});
  });
};