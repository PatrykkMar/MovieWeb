'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
    username: {
        type : String,
        unique: true,
        required: 'username is required'
    },

    email: {
        type: String,
        unique: true,
        required: 'email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        minlength: 5,
        required: 'password is required'
    },

    birthdate: {
        type: Date,
        required: 'birthdate is required'
    },

    nationality:{
        type: String,
        required: 'nationality is required'
    },

    gender: {
        type: String,
        required: 'gender is required'    
    },

    role: {
        type: String,
        enum: ['USER', 'CRITIC', 'ADMINISTRATOR'],
        required: 'role is required'  
    },

    profilePicture: {
        data: Buffer, contentType: String
    },

    active: {
        type: Boolean,
        default: false
    },

    created: {
        type: Date,
        default: Date.now
    },

    favourite_movies: {
        type: Array,
        default: []
    },

    must_see_movies: {
        type: Array,
        default: []
    }
})

UserSchema.pre('save', function(callback) {
    var actor = this;
    // Break out if the password hasn't changed
    if (!actor.isModified('password')) return callback();
  
    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return callback(err);
  
      bcrypt.hash(actor.password, salt, function(err, hash) {
        if (err) return callback(err);
        actor.password = hash;
        callback();
      });
    });
  });
  
  UserSchema.methods.verifyPassword = function(password, cb) {
      bcrypt.compare(password, this.password, function(err, isMatch) {
      console.log('verifying password in actorModel: ' + password);
      if (err) return cb(err);
      console.log('iMatch: '+isMatch);
      cb(null, isMatch);
    });
  };
  
  module.exports = mongoose.model('Users', UserSchema);