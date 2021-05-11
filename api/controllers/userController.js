'use strict';
/*---------------USER----------------------*/
var mongoose = require('mongoose'),
  User = mongoose.model('Users');

  exports.list_all_users = function(req, res) {
        //Check if the role param exist
        var roleName;
        if(req.query.role){
            roleName=req.query.role;
        }
        //Adapt to find the users with the specified role
        User.find({}, function(err, users) {
            if (err){
            res.status(500).send(err);
            }
            else{
                res.json(users);
            }
        });
    };

  exports.create_an_user = function(req, res) {
        var new_user = new User(req.body);

        new_user.save(function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(user);
        }
        });
    };

    exports.add_favourite_movie = function(req, res) {

        var userId = req.params.userId;
        var movieId = req.params.movieId;

        console.log(userId);
        console.log(movieId);

        User.findOne({_id: mongoose.Types.ObjectId(userId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var favourites = user.favourite_movies;
                var movie = mongoose.Types.ObjectId(movieId);
                if(favourites.includes(movie)){
                    res.status(500).send("Movie already in favourites");
                } else {
                    favourites.push(movie);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {favourite_movies: favourites}, {new: true}, function(err, user){
                        if (err){
                            res.status(500).send(err);
                        } else{
                            res.json(user);
                        }
                    });
                }
            }
        });
    }