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