var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserItemSchema = new Schema({
    itemCode: Number,
    rating: Number,
    watchedIt: Number,
    userID: Number
});

var UserItem = mongoose.model('itemratings',UserItemSchema);
module.exports = UserItem;