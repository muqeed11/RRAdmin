var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
        customerName:{type:String,required:true},
        userId:{type:String,required:true},
        customerEmail:{type:String},
        gender:{type:String},
        createdDate:{type:Date,required:true},
        validDate:{type:Date},
        dateOfBirth:{type:String},
        area:{type:String},
        city:{type:String},
        phoneNumber:{type:String,required:true},
        married:{type:String},
        occupation:{type:String},
        habits:{type:String},
        medicalHistory:{type:String},
        familyDoctor:{type:String},
        doctorNumber:{type:String},
        emergencyNumber:{type:String},
        customerRole:{type:String,required:true},
        lastUpdated:{type:Date,default:Date.now,required:true}

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('userprofiles',schema);
