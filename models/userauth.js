
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
// mongoose.connect('mongodb://localhost:20717/node-angular');


var UserSchema = new Schema({
    userId:{type:String,required:true},
    password:{type:String,required:true},
    customerEmail:{type:String},
    customerName:{type:String,required:true},
    active:{type:String ,required:true},
    createdDate:{type:Date,required:true},
    customerRole:{type:String},
    validDate:{type:Date,required:true},
    lastUpdated:{type:Date,required:true}

});

UserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('userauths',UserSchema);
// =======================

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/node-angular');
// // mongoose.connect('mongodb://localhost/crud');
//
// var UserSchema = new mongoose.Schema(
//     {
//         firstName:String,
//         password:String
//     }
// );
//
// module.exports = mongoose.model("users",UserSchema);