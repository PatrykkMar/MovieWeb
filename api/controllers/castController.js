'use strict';
/*---------------CAST----------------------*/
var mongoose = require('mongoose'),
    Cast = mongoose.model('Cast');

exports.list_cast = function(req, res) {
    Cast.find({}, function(err, users) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(users);
        }
    });
};

exports.create_cast_member = function(req, res) {
    var new_cast_member = new Cast(req.body);

    new_cast_member.save(function(err, user) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(user);
        }
    });
};