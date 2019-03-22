var UserItem = require('./UserItem');
var userdb = require('../utility/UserDB');
var itemDB = require('../utility/ItemDB');
class UserProfile {

    //Constructor for item details
constructor(userID, UserItem){
    this._userID = userID;
    this._UserItem = UserItem;
}
//Getters and Setters 
get userID() {
    return this._userID; 
}

set userID(value) {
    this._userID = value;
}
get UserItem() {
    return this._UserItem;
}

set UserItem(value) {
    this._UserItem = value;
}
}

    
var addItem = function(itemID, items){
    var addFlag = false;
    for(var i=0;i<items.length;i++){
     console.log(items[i]._itemCode);
      if(itemID == items[i]._itemCode){
        addFlag= true;
      }  
  }
  console.log(addFlag);
    if(addFlag == true){
        return items;
    }
    else{
        var itemAdd = itemDB.getItem(itemID);
        console.log(itemAdd);
        let item = new UserItem(itemID,0,0,itemAdd.itemName,itemAdd.catalogCategory);
        items.push(item);
    }
    console.log("items to be added");
  console.log(items);
  return items;
}

var removeItem = function(itemID, items) {
    console.log('check session items');
    console.log(itemID);
    for(var i=0;i<items.length;i++){

        console.log(items[i]._itemCode);
      if(itemID == items[i]._itemCode) {
        items.splice(i,1);
        break;
      }  
  }
  console.log(items);
  return items;
}
  
var updateItem = function(itemID,items,newRating,newFlag){
  var actualRating;
  var actualFlag;
  for(var i=0;i<items.length;i++){
    if(itemID == items[i]._itemCode){
      actualRating = items[i]._rating;
      actualFlag = items[i]._watchedIt;
    }
  }
  if(actualRating == newRating && actualFlag == newFlag){
    return items;
  }
  else if(actualRating != newRating || actualFlag != newFlag){
    for(var i=0;i<items.length;i++){
      if(itemID == items[i]._itemCode){
        items[i]._rating = newRating;
        items[i]._watchedIt = newFlag;
      }
    }
    return items;
  }

}

var getItems = function(){
  var userData = userdb.userprofile;
    console.log("my items");
    return userData;
    console.log(userData);
}
//console.log(getItems());  

var emptyProfile = function(){
 delete userdb.userprofile;
}

module.exports=UserProfile;
module.exports.removeItem=removeItem;
module.exports.addItem=addItem;
module.exports.updateItem=updateItem;
module.exports.getItems = getItems;
module.exports.emptyProfile = emptyProfile;