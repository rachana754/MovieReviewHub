var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema =   new Schema({
    userID: Number,
    firstName: String,
    lastName: String,
    email: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
    password: String
});
var User = mongoose.model('users',UserSchema);
module.exports=User;
