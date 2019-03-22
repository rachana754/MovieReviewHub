var User = require('../models/User');
var UserItem = require('../models/UserItem');
var UserProfile = require('../models/UserProfile');


var data = [{
    userID:1,
    firstName:'Rachana',
    lastName:'Revuri',
    email:'rr@gmail.com',
    address1:'678 blvd apt 23',
    address2:'',
    city:'charlotte',
    state:'NC',
    zipCode:28262,
    country:'USA'
    
},
{
    userID:2,
    firstName:'Vamshi',
    lastName:'Krishna',
    email:'rvk23@gmail.com',
    address1:'hnk 278',
    address2:'',
    city:'charlotte',
    state:'NC',
    zipCode:28262,
    country:'USA'

}];

var itemData =[{
    itemCode:1,
    rating:5,
    watchedIt:0,
    itemName: 'Aquaman',
    itemCategory: 'Super Hero'
},
{
    itemCode:3,
    rating:4,
    watchedIt:1,
    itemName: 'Black Panther',
    itemCategory: 'Super Hero'
},
{
    itemCode:5,
    rating:2,
    watchedIt:0,
    itemName: 'Game Night',
    itemCategory: 'Action-Comedy'
}
];

var userItemData =[{
    userID:1,
    itemCode:[1,3,5]
},
{
    userID:2,
    itemCode:[3]
}];

 var getUser = function(userID){
    for(var i=0;i<data.length;i++){
        if(data[i].userID==userID){
            let user = new User(data[i].userID,
                data[i].firstName,
                data[i].lastName,
                data[i].email,
                data[i].address1,
                data[i].address2,
                data[i].city,
                data[i].state,
                data[i].zipCode,
                data[i].country);
                return user;
        }
    }
} 

var getAllusers = function(){
    let users = [];
    for(var i=0; i<data.length;i++){
        let user = new User(data[i].userID,
            data[i].firstName,
            data[i].lastName,
            data[i].email,
            data[i].address1,
            data[i].address2,
            data[i].city,
            data[i].state,
            data[i].zipCode,
            data[i].country);
            users.push(user);
    }
    return users;
}
//console.log("printing ;;;;");
//console.log(getUser(1));
//console.log(getAllusers());

var getUserItems = function(userID){
    var items = [];
    for(var i=0;i<userItemData.length;i++){
        if(userItemData[i].userID == userID){
            console.log(userID + ' is user id');
            //console.log(userItemData[i].itemCode.length);
            for(var j=0;j<userItemData[i].itemCode.length;j++){
               var item = getUserItem(userItemData[i].itemCode[j]);
               items.push(item);
               //console.log(userItemData[i].itemCode[j]);
               //console.log(item._watchedIt);
            }

        }
    }
    //console.log(items);
    return items;
    

}

var getUserItem = function(itemCode){
    for(var i=0;i<itemData.length;i++){
        if(itemData[i].itemCode == itemCode){
            console.log(itemData[i].itemCode);
            let item = new UserItem(itemData[i].itemCode,itemData[i].rating,itemData[i].watchedIt,itemData[i].itemName,itemData[i].itemCategory);
            //console.log(item);
            return item;
        }
    }
}
var items =  new getUserItems(1);
var userprofile = new UserProfile(1,items);
module.exports.getUser = getUser;
module.exports.getAllusers = getAllusers;
module.exports.getUserItems = getUserItems;
module.exports.getUserItem = getUserItem;
module.exports.userprofile = userprofile;
module.exports.items = items;