var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function ListSchema() {  
    Schema.apply(this, arguments);  

    this.add({  
        userID: { type: String },  
        movieID: { type: Number },  
    });  
}  

util.inherits(BaseSchema, Schema);  

var FavoriteListSchema = new ListSchema();
var MustSeeListSchema = new ListSchema();
FavoriteListSchema.virtual('type').get(function () { return this.__t; });  
MustSeeListSchema.virtual('type').get(function () { return this.__t; }); 
