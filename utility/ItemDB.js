var Item = require('../models/Item');
class ItemDB {
    constructor() {
    }
    
    //This function retrieves all the items from the DB
    getItems(){
        return new Promise( function(resolve, reject){
            Item.find().then(function(data){
                resolve(data);
            }).catch(function(err){
                console.log(err);
                return reject(err);
            });
    
        });   
    }
    
    //This function retrieves the particular item with matching itemCode from the DB
     getItem(code){
        return new Promise( function(resolve, reject){
            var stmt;
            stmt = Item.findOne({itemCode:code});
            stmt.then(function(data){
                resolve(data);
                //console.log(data);
            }).catch(function(err){
                console.log(err);
                return reject(err);
            });
    
        });  
    }

    //This function retrieves categories from the list of items.
   async getCategories(){
    // get the category of each item
    var categories = [];
    var data = await this.getItems();
    data.forEach(function (item) {
        //console.log(!categories.includes(item.catalogCategory));
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    return categories;
 }

}




module.exports = ItemDB;

