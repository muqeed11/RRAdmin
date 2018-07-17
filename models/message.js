var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Messageschema = new Schema({
    userId:{type:String},
    messageSub:{type:String},
    messageContent:{type:String},
    messageStatus:{type:String},
    createdDate:{type:Date},
    lastUpdated:{type:Date}

});

module.exports = mongoose.model('Messages',Messageschema);
