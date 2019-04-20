var UserItem = require('../models/UserItem');
var Item = require('../utility/ItemDB');
class UserItemDB{
    constructor() {

    }
    
    //Returns all items of a user from DB
    getuserItems(){
        return new Promise(function(resolve,reject){
            var stmt;
            stmt = UserItem.find();
            stmt.then(function(data){
                resolve(data);
                console.log('my user data');
                console.log(data);
            }).catch(function(err){
                return reject(err);
            });
        });
    }
    
    //Returns particular item details of user.
    //Used in feedback page.
    getuserItemData(itemID){
        return new Promise(function(resolve,reject){
            var stmt;
            stmt = UserItem.findOne({itemCode:itemID});
            stmt.then(function(data){
                resolve(data);
                console.log('my user item data');
                console.log(data);
            }).catch(function(err){
                return reject(err);
            });
        });
    }

    //This function updates only item rating of an item
    addItemRating(itemID,userID,rating){
        return new Promise((resolve,reject) =>{
            UserItem.findOneAndUpdate({itemCode:itemID},
                {$set:{rating:rating}},(err) => {
                if (err) return console.error(err);
                UserItem.find().then( data => {
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
            UserItem.findOneAndUpdate({itemCode:itemID},
                {$set:{watchedIt:watchedIt}},(err) => {
                if (err) return console.error(err);
                UserItem.find().then( data => {
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
        var itemData = await this.getuserItemData(itemCode);
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
    removeItem(itemID){
    return new Promise((resolve,reject) =>{
          UserItem.deleteOne({itemCode:itemID},(err) =>{
              if (err) return console.error(err);
              UserItem.find().then( data => {
              resolve(data);
              }).catch(err => {
              return reject(err);
              });

          });  

        });
    }

    //This function adds an item to the users profile page.
    async addItem(itemID){
        let x = new Item();
        var itemData = await x.getItem(itemID);
        return new Promise((resolve,reject) =>{
            UserItem.update({itemCode:itemID},
                {$setOnInsert:{rating:0,watchedIt:0,userID:itemData.userID,itemName:itemData.itemName,itemCategory:itemData.catalogCategory}},
                {upsert:true},(err) => {
                if (err) return console.error(err);
                UserItem.find().then( data => {
                resolve(data);
                }).catch(err => {
                return reject(err);
                });
  
            });  
  
          });
    }
}


module.exports = UserItemDB;