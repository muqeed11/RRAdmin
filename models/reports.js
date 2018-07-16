
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
// mongoose.connect('mongodb://localhost:20717/node-angular');


var UserSchema = new Schema({
    userId:{type:String,required:true},
    // reportId:{type:Number,required:true},
    reportType:{type:String,required:true},
    reportDate:{type:String ,required:true},
    reportKey:{type:String,required:true},
    reportStatus:{type:String},
    reportReason:{type:String},
    createdDate:{type:Date,required:true},
    lastUpdated:{type:Date,default:Date.now(),required:true}

});

UserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('reports',UserSchema);