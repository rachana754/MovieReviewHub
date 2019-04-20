var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  itemCode : Number,
  itemName : String,
  catalogCategory : String,
  description : String,
  rating : Number,
  imageURL : String,
  userID : Number
});

var Item = mongoose.model('items',ItemSchema);
module.exports = Item;