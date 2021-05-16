'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


    exports.authenticate_user = function(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err){
                res.status(500).send(err);
            }
            else{
                var passwordIsValid = bcrypt.compare(req.body.password, user.password);
                if (err) return res.send(err);
                if (!passwordIsValid) return res.json({ msg: "Invalid credentials." });
                var token = jwt.sign({ id: user._id }, 'supersecret', {
                    expiresIn: 86400 // 24 hours
                });
                res.json({ auth: true, token: token });
            }
        });
    };



    exports.read_an_user = function(req, res) {
        User.findById(req.params.userId, function(err, user) {
          if (err){
            res.status(500).send(err);
          }
          else{
            res.json(user);
          }
        });
      };
      
    exports.update_an_user = function(req, res) {
          //Check that the user is the proper user and if not: res.status(403); "an access token is valid, but requires more privileges"
          User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
            if (err){
              if(err.name=='ValidationError') {
                  res.status(422).send(err);
              }
              else{
                res.status(500).send(err);
              }
            }
            else{
                res.json(user);
            }
          });
      };

      exports.delete_an_user = function(req, res) {
        //Check if the user is an administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
          User.deleteOne({_id: req.params.userId}, function(err, user) {
              if (err){
                  res.status(500).send(err);
              }
              else{
                  res.json({ message: 'User successfully deleted' });
              }
          });
      };
    exports.add_favourite_movie = function(req, res) {

        var userId = req.params.userId;
        var movieId = req.params.movieId;

        User.findOne({_id: mongoose.Types.ObjectId(userId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var favourites = user.favourite_movies;
                var movie = mongoose.Types.ObjectId(movieId);
                if(favourites.includes(movie)){
                    res.status(500).send("Movie already in Favourites list");
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

    exports.add_must_see_movie = function(req, res) {
        
        var userId = req.params.userId;
        var movieId = req.params.movieId;

        User.findOne({_id: mongoose.Types.ObjectId(userId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var must_see = user.must_see_movies;
                var movie = mongoose.Types.ObjectId(movieId);
                if(must_see.includes(movie)){
                    res.status(500).send("Movie already in Must See list");
                } else {
                    must_see.push(movie);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {must_see_movies: must_see}, {new: true}, function(err, user){
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

    exports.delete_movie_from_favourites = function(req, res) {

        var userId = req.params.userId;
        var movieId = req.params.movieId;

        User.findOne({_id: mongoose.Types.ObjectId(userId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var favourites = user.favourite_movies;
                var movie = mongoose.Types.ObjectId(movieId);
                if(!favourites.includes(movie)){
                    res.status(500).send("Movie Not in Favourites list");
                } else {
                    var index = favourites.indexOf(movie);
                    favourites.splice(index, 1);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {favourite_movies: favourites}, function(err, user){
                        if (err){
                            res.status(500).send(err);
                        } else{
                            res.json(favourites);
                        }
                    });
                }
            }
        });
    }

    exports.delete_movie_from_must_see = function(req, res) {

        var userId = req.params.userId;
        var movieId = req.params.movieId;

        User.findOne({_id: mongoose.Types.ObjectId(userId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var must_see = user.must_see_movies;
                var movie = mongoose.Types.ObjectId(movieId);
                if(!must_see.includes(movie)){
                    res.status(500).send("Movie Not in Must See list");
                } else {
                    var index = must_see.indexOf(movie);
                    must_see.splice(index, 1);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {must_see_movies: must_see}, function(err, user){
                        if (err){
                            res.status(500).send(err);
                        } else{
                            res.json(must_see);
                        }
                    });
                }
            }
        });
    }

    exports.follow_user = function(req, res) {
        
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        if(followerId===followedId)
        {
        res.status(500).send("You can't follow yourself");
        }

        User.findOne({_id: mongoose.Types.ObjectId(followerId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var followed_list = user.followed_users;
                var new_followed = mongoose.Types.ObjectId(followedId);
                if(followed_list.includes(new_followed)){
                    res.status(500).send("User already in followed users list");
                } else {
                    followed_list.push(new_followed);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(followerId)}, {followed_users: followed_list}, {new: true}, function(err, user){
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

    exports.delete_user_from_followed_users = function(req, res) {

        var followerId = req.params.followerId;
        var followedId = req.params.followedId;

        User.findOne({_id: mongoose.Types.ObjectId(followerId)}, function(err, user) {
            if (err){
                res.status(500).send(err);
            }
            else{
                var followed_list = user.followed_users;
                var followed = mongoose.Types.ObjectId(followedId);
                if(!followed_list.includes(followed)){
                    res.status(500).send("User Not in Followed list");
                } else {
                    var index = followed_list.indexOf(followed);
                    followed_list.splice(index, 1);
                    User.findOneAndUpdate({_id: mongoose.Types.ObjectId(followerId)}, {followed_users: followed_list}, function(err, user){
                        if (err){
                            res.status(500).send(err);
                        } else{
                            res.json(followed_list);
                        }
                    });
                }
            }
        });
    }

    exports.search_user = function(req, res) {

        let query = {};
    
        if(req.query.username){
            query.username=req.query.username;
        }
    
        if(req.query.email){
            query.email=req.query.email;
        }

        if(req.query.birthdate){
            query.birthdate=req.query.birthdate;
        }
        
        if(req.query.nationality){
            query.nationality=req.query.nationality;
        }

        if(req.query.gender){
            query.gender=req.query.gender;
        }

        User.find(query)
            .exec(function(err, users){
                if (err){
                    res.send('Query error');
                }
                else{
                    res.json(users);
                }
            });
    
    
    };
