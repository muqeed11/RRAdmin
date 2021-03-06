var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var PaymentSchema = new Schema({
    userId:{type:String,required:true},
    customerPlan:{type:String},
    paidDate:{type:Date},
    customerValidDate:{type:Date},
    paidTo:{type:String},
    createdDate:{type:Date,required:true},
    lastUpdated:{type:Date,default:Date.now(),required:true}

});

PaymentSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('payments',PaymentSchema);