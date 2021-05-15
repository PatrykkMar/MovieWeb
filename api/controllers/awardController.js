'use strict';
/*---------------AWARDS----------------------*/
var mongoose = require('mongoose'),
    Award = mongoose.model('Awards');

exports.create_new_award = function(req, res) {
    var new_award = new Award(req.body);
    
     new_movie.save(function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(user);
        }
    });
};


exports.list_awards = function(req, res) {
    Movie.find({}, function(err, award) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(award);
        }
    });
};

exports.get_award = function(req, res) {
    Movie.findById(function(err, award) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(award);
      }
    });
};

exports.update_award = function(req, res) {
    // authorization: check if Critic if not: res.status(403); "an access token is valid, but requires more privileges"
      Movie.findOneAndUpdate({_id: req.params.awardId}, req.body, {new: true}, function(err, award) {
        if (err){
          if(err.name=='ValidationError') {
              res.status(422).send(err);
          }
          else{
            res.status(500).send(err);
          }
        }
        else{
          res.json(award);
        }
      });
  };


exports.delete_award = function(req, res) {
//Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    Movie.deleteOne({_id: req.params.movieId}, function(err, award) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'award successfully deleted' });
        }
    });
};