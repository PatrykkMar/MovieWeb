
'use strict';
/*---------------CAST----------------------*/
var mongoose = require('mongoose'),
    Cast = mongoose.model('Cast');

exports.list_cast = function(req, res) {
    Cast.find({}, function(err, cast) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(cast);
        }
    });
};

exports.create_cast_member = function(req, res) {
    var new_cast_member = new Cast(req.body);

    new_cast_member.save(function(err, cast) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(cast);
        }
    });
};

exports.read_cast_member = function(req, res) {
    Cast.findById(req.params.castId, function(err, cast) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(cast);
        }
    });
};

exports.update_cast_member = function(req, res) {
    Cast.findOneAndUpdate({_id: req.params.castId}, req.body, {new: true}, function(err, cast) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(cast);
        }
    });
};

exports.delete_cast_member = function(req, res) {
    Cast.deleteOne({_id: req.params.castId}, function(err, cast) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Cast member successfully deleted' });
        }
    });
};

exports.search_cast = function(req, res) {

    let query = {};

    if(req.query.name){
        query.name=req.query.name;
    }

    if(req.query.surename){
        query.surename=req.query.surename;
    }
    Cast.find(query)
        .exec(function(err, cast){
            if (err){
                res.send('sss');
            }
            else{
                res.json(cast);
            }
        });


};

