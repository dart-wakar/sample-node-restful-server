var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:String,
    age:Number,
    room:Number
});

module.exports = mongoose.model('User',UserSchema);