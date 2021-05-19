'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: {
      type: String,
      required: 'Kindly enter the title of the comment'
    },
    author:{
        id: {type: String},
        gender: {type: String}
    },
    commentText: {
      type: String,
      required: 'Kindly enter your comments',
    },
    stars: {
      type: Number,
      required: 'Kindly enter the stars',
      min: 0, max: 5
    },
    created: {
      type: Date,
      default: Date.now
    },

    // role:{
    //     enum: [...]
    // }
  }, { strict: false });

//   var CategorySchema = new Schema({
//     name: {
//       type: String,
//       required: 'Kindly enter the name of the Category'
//     },
//     // description: {
//     //   type: String,
//     //   required: 'Kindly enter the description of the Category'
//     // },
//   }, { strict: false });

var AwardSchema = new Schema({
    name: {
        type: String,
        required: 'enter award name'
    },
    
    countryOfOrigin: {
        type: String,
        required: 'enter where award is given'
    },

    year: {
        type: Number
    }
})

var StudioSchema = Schema({
    studioName: {
        type: String,
        required: 'Enter studios name'
    },

    countryOfOrigin: {
        type: String
    },

    description: {
        type: String,
        default: 'This studio has no description yet.'
    }
})

var MovieSchema = new Schema({
    title: {
        type: String,
        required: 'enter the title of movie'
    },

    originalTitle: {
        type: String,
        required: 'enter original title'
    },

    plot: {
        type: String,
        default: 'this movie has no description yet'
    },

    picture: {
        data: Buffer, contentType: String
    },

    director: [{
        name: {type: String},
        link: {type: mongoose.Schema.Types.ObjectId,
            ref: 'Cast'}
    }],

    actors: [{
        name: {type: String},
        link: {type: mongoose.Schema.Types.ObjectId,
            ref: 'Cast'}
    }],

    restOfCast:[{
        name: {type: String},
        link: {type: mongoose.Schema.Types.ObjectId,
            ref: 'Cast'}
    }],

    CountryOfOrigin: [{
        type: String 
    }],

    Boxoffice: {
        type: Number
    },

    averageUsersRating: {
        type: Number,
        min: 0, max: 5,
        default: 0
    },

    averageCriticsRating: {
        type: Number,
        min: 0, max: 5,
        default: 0
    },

    studio: [StudioSchema],

    awards: [AwardSchema],

    userComments: [CommentSchema],

    criticsComments: [CommentSchema],

    category: [{
        type: String
    }]

}, { strict: false })

MovieSchema.pre('save', function(callback) {
    var new_item = this;
  
    callback();
  });

  module.exports = mongoose.model('Movies', MovieSchema);
  module.exports = mongoose.model('Comments', CommentSchema);
  module.exports = mongoose.model('Awards', AwardSchema);
  module.exports = mongoose.model('Studios', StudioSchema);