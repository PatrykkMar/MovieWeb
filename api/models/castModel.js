'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CastSchema = new Schema({
    name: {
        type: String,
        required: 'enter name'
    },

    surename: {
        type: String,
        required: 'enter surename'
    },

    birthdate: {
        type: Date
    },

    nationality:{
        type: String
    },

    biography:{
        type: String
    },

    picture: {
        data: Buffer, contentType: String
    },

    averageRating: {
        type: Number,
        min: 0, max: 5
    },
}, {strict: false})

CastSchema.pre('save', function(callback) {
    var new_item = this;
  
    callback();
  });

  module.exports = mongoose.model('Cast', CastSchema);