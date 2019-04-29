var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
var userItemDb = require('../utility/UserItemDB');
const {check,validationResult } = require('express-validator/check');

// This middleware function will set the welcome header and login button accordingly before any routing is called.
router.get('/*',function(req,res,next){
    if(req.session.theUser){
            userName = "Welcome " + req.session.theUser.firstName;
            console.log(req.session.theUser.firstName);
            loginButton= 'Sign Out' 
        
   }
   else{
           userName= 'Not signed in';
           loginButton= 'Sign In';
       
   }
   next();
   
});

//This function is for displaying index page. Below 2 routes are used for it.
router.get('/',function(req,res){
    var data = {
        title: 'Home',
        userName: userName,
        loginButton: loginButton
    }
    res.render('index',{data:data});
});

router.get('/index',function(req,res){
    var data = {
        title: 'Home',
        userName: userName,
        loginButton: loginButton
    }
    res.render('index',{data:data});
    
  });

  //This function will retrieve item details of particular item.
  //flag is used to hide/display save button according to user items in his profile.
router.get('/categories/item/:itemCode',check('itemCode').isLength({ min:1 }).isNumeric(),async function(req,res){
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+ itemCode);
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
	} else {
		console.log("no errors in item rendering");
	}
    var x = new itemDb();
    var item = await x.getItem(itemCode);
    var userObj = req.session.theUser;
    var flag = 0 ;
    if(userObj){
        var userId = userObj.userID;
        var y = new userItemDb();
        var userData = await y.getuserItemData(itemCode,userId);
        if(userData != null && userData.itemCode == itemCode){
            flag = 1;
        }
    }
    if(item === undefined || item == null)
    {
      var itemData = await x.getItems();
      var categories = await x.getCategories();
      console.log("categories are:");
      console.log(categories);
      var data = {
          title:'Categories',
          categories: categories,
          items: itemData,
          userName: userName,
          loginButton: loginButton
      }
    res.render('categories',{data:data});
    }
  else
   {
     var data = {
         title:'Item',
         item: item,
         userName: userName,
         loginButton: loginButton,
         flag: flag
     }
    res.render('item',{data: data});
  }
});

//This function will retrieve items only of that particular category name
router.get('/categories/:categoryName', async function(req,res){
    var categories = [];
    categories.push(req.params.categoryName);
    console.log("Category:"+ categories);
    var x = new itemDb();
    var itemData = await x.getItems();
        var data = {
            title:'Categories',
            categories: categories,
            items: itemData,
            userName: userName,
            loginButton: loginButton
        }
        res.render('categories',{data:data});    
});

//This function will retrieve all catalog items.
router.get('/categories', async function(req,res){
    let x = new itemDb();
    var categories = await x.getCategories();
    var itemData = await x.getItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        userName: userName,
        loginButton: loginButton
    }
    res.render('categories',{data:data});
 });
 
 //This function will display contact page of Website
router.get('/contact',function(req,res){
    var data = {
        title:'Contact Us',
        userName: userName,
        loginButton: loginButton
    }
    res.render('contact',{data:data});
});

//This function will display about page of Website
router.get('/about',function(req,res){
    
   var data={
    title: 'About Us',
    userName: userName,
    loginButton: loginButton
    }
    res.render('about',{data:data});     
    
});

module.exports = router;