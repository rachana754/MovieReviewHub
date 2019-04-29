var UserItem = require('../models/UserItem');
var Item = require('../utility/ItemDB');
class UserItemDB{
    constructor() {

    }
    
    //Returns all items of a user from DB
    getuserItems(id){
        return new Promise(function(resolve,reject){
            UserItem.find({userID:id}).then(function(data){
                resolve(data);
                //console.log('my user data');
                //console.log(data);
            }).catch(function(err){
                return reject(err);
            });
        });
    }
    
    //Returns particular item details of user.
    //Used in feedback page.
    getuserItemData(itemID,userID){
        return new Promise(function(resolve,reject){
            var stmt;
            stmt = UserItem.findOne({itemCode:itemID,userID:userID});
            stmt.then(function(data){
                resolve(data);
               // console.log('my user item data');
                //console.log(data);
            }).catch(function(err){
                return reject(err);
            });
        });
    }

    //This function updates only item rating of an item
    addItemRating(itemID,userID,rating){
        return new Promise((resolve,reject) =>{
            UserItem.findOneAndUpdate({itemCode:itemID,userID:userID},
                {$set:{rating:rating}},(err) => {
                if (err) return console.error(err);
                UserItem.find({userID:userID}).then( data => {
                    console.log("Rating");
                    console.log(data);
                resolve(data);
                }).catch(err => {
                return reject(err);
                });
  
            });  
  
          });
    }

    //This function updates only item watchedIt flag of an item
    addWatchedIt(itemID,userID,watchedIt){
        return new Promise((resolve,reject) =>{
            UserItem.findOneAndUpdate({itemCode:itemID,userID:userID},
                {$set:{watchedIt:watchedIt}},(err) => {
                if (err) return console.error(err);
                UserItem.find({userID:userID}).then( data => {
                    console.log("Watched ");
                    console.log(data);
                resolve(data);
                }).catch(err => {
                return reject(err);
                });
  
            });  
  
          });   
    }
    
    //This function updates item based on what is changed i.e rating or watchedIt flag.
    async updateItem(itemCode,userID,newRating,newFlag){
        var itemData = await this.getuserItemData(itemCode,userID);
        console.log(itemData);
        var actualRating = itemData.rating;
        console.log(itemData.rating);
        var actualFlag = itemData.watchedIt;
        console.log(itemData.watchedIt);
        if(actualRating != newRating && actualFlag !=newFlag){
            var items = await this.addItemRating(itemCode,userID,newRating);
           var items = await this.addWatchedIt(itemCode,userID,newFlag);
        }
        else if(actualRating != newRating){
           var items =  await this.addItemRating(itemCode,userID,newRating);
        }
        else if(actualFlag !=newFlag){
            var items = await this.addWatchedIt(itemCode,userID,newFlag);
        }
        else{
            var items = await this.getuserItems();
        }
        console.log(items);
        return items;
    }
    
    //This function removes or deletes an item from the users profile page and DB
    removeItem(itemID,userID){
    return new Promise((resolve,reject) =>{
          UserItem.deleteOne({itemCode:itemID,userID:userID}, (err) =>{
              if (err) return console.error(err);
              UserItem.find({userID:userID}).then( data => {
              resolve(data);
              }).catch(err => {
              return reject(err);
              });

          });  

        });
    }

    //This function adds an item to the users profile page.
     addItem(itemID,id){
        return new Promise((resolve,reject) =>{
            UserItem.insertMany({itemCode:itemID,rating:0,watchedIt:0,userID:id}, (err) => {
                if (err) return console.error(err);
                UserItem.find({userID:id}).then( data => {
                resolve(data);
                }).catch(err => {
                return reject(err);
                });
  
            });  
  
          });
    }
}


module.exports = UserItemDB;