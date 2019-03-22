var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var itemDb = require('../utility/ItemDB');
var userdb = require('../utility/UserDB');
var userProfile = require('../models/UserProfile');
let jsdom = require('jsdom').JSDOM,
 uri = './views/myItems.ejs';
 router.get('/*',function(req,res,next){
    if(req.session.theUser){
            userName = "Welcome " + req.session.theUser._firstName;
            console.log(req.session.theUser._firstName);
            loginButton= 'Sign Out' 
        
   }
   else{
           userName= 'Not signed in';
           loginButton= 'Sign In';
       
   }
   next();
   
});
 
router.get('/myItems',function(req,res){
    var userData = userdb.userprofile.UserItem;
    console.log("checking");
    console.log(userData);    
    if(req.session.theUser){
        var data = {
            title: 'My Movies',
            userName : "Welcome " + req.session.theUser._firstName,
            userData: req.session.itemList,
            loginButton: 'Sign Out' 
        }
        console.log("session is created");
        console.log(userData);
        
        res.render('myItems',{data:data});
    }
    else{
        var userObj = userdb.getUser(1);
        console.log(userObj._firstName);
        var data = {
            title: 'My Movies',
            userName : "Welcome " + userObj._firstName,
            userData: userData,
            loginButton: 'Sign Out' 
        }
        req.session.theUser = userObj;
        req.session.itemList = userData;
        
        console.log("first visit to website --- session being created");
        console.log(data.userName);
        console.log(req.session.itemList[1].itemCode);
        res.render('myItems',{data:data});
    }

});

router.get('/*',function(req,res,next){
    if(req.session.theUser){
            userName = "Welcome " + req.session.theUser._firstName;
            console.log(req.session.theUser._firstName);
            loginButton= 'Sign Out' 
        
   }
   else{
           userName= 'Not signed in';
           loginButton= 'Sign In';
       
   }
   next();
   
});

router.get('/feedback/:itemCode',function(req,res){
    var itemCode = req.params.itemCode;
    var itemData = userdb.getUserItem(itemCode);
    var items = req.session.itemList;
    var session = req.session.theUser;
    var item = itemDb.getItem(itemCode);
    var rating;
    var flag;
    console.log("item display");
    if(session){
        for(var i=0;i<items.length;i++){
            if(items[i]._itemCode == itemCode)
            {
                rating = items[i]._rating;
                flag = items[i]._watchedIt;
            }
        }
    }
   
    console.log(item);
    
    if(item === undefined || session == null || session == undefined)
    {
        var itemData = itemDb.getItems();
        var categories = getCategories();
        var data = {
            title:'Categories',
            categories: categories,
            items: itemData,
            userName: userName,
            loginButton: loginButton
        }
      res.render('categories',{data:data});
      
    }
  else if(session)
   {
    var data = {
        title:'Feedback',
        item: item,
        itemData: itemData,
        userName: userName,
        loginButton: loginButton,
        rating: rating,
        flag: flag
    }
   res.render('feedback',{data: data});
    
  }
});
router.post('/delete', urlencodedParser, function(req,res){
    if(req.session.theUser){
        userName = "Welcome " + req.session.theUser._firstName;
        console.log(req.session.theUser._firstName);
        loginButton= 'Sign Out' 
    
}
else{
       userName= 'Not signed in';
       loginButton= 'Sign In';
   
}
  var x = req.body.itemCode;
  console.log(req.body.delete);
  console.log("items are :(");
  //console.log(sessionItems);
  var items;
  items = userProfile.removeItem(x,req.session.itemList);
  req.session.itemList = items;
  console.log("items are");
  console.log(items);
  var data ={
    title: 'My Movies',
    userName: userName,
    loginButton: loginButton,
    userData: items
  }
  console.log('delete item')
  console.log(data.userName);
res.render('myItems',{data:data});
});

router.post('/save', urlencodedParser, function(req,res){
    var session = req.session.theUser;
    if(session == null || session == undefined)
    {
        var itemData = itemDb.getItems();
        var categories = getCategories();
        var data = {
            title:'Categories',
            categories: categories,
            items: itemData,
            userName: userName,
            loginButton: loginButton
        }
      res.render('categories',{data:data});
      
    }
    else{
        var x = req.body.itemCode;
  var items = userProfile.addItem(x,req.session.itemList);
  req.session.itemList = items;
  console.log(" added items are");
  console.log(items);
  var data ={
    title: 'My Movies',
    userName: userName,
    loginButton: loginButton,
    userData: items
  }
  //console.log(data.userData[1]);
res.render('myItems',{data:data});
    }
    
  
});

router.post('/update', urlencodedParser, function(req,res){
    var itemCode = req.body.itemCode;
    var newRating = req.body.rating;
    var newFlag = req.body.radio;
  var items = userProfile.updateItem(itemCode,req.session.itemList,newRating,newFlag);
  req.session.itemList = items;
  console.log(" updated items are");
  console.log(items);
  var data ={
    title: 'My Movies',
    userName: userName,
    loginButton: loginButton,
    userData: items
  }
  //console.log(data.userData[1]);
res.render('myItems',{data:data});
  
});

router.get('/signout',function(req,res){
    req.session.destroy(function(err){
        var data = {
            title: 'Home',
            userName: 'Not signed in',
            loginButton: 'Sign In'
        }
        res.render('index',{data:data});
    });
});



var categories = [];

let getCategories = function() {
    // get the category of each item
    var data = itemDb.getItems();
    data.forEach(function (item) {
        //console.log(!categories.includes(item.catalogCategory));
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
        
    });
    return categories;
};


module.exports = router;
