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