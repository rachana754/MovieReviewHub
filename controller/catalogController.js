var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
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

router.get('/categories/item/:itemCode',function(req,res){
    var itemCode = req.params.itemCode;
    console.log("Item Code:"+ itemCode);
    var item = itemDb.getItem(itemCode);
    if(item === undefined)
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
  else
   {
     var data = {
         title:'Item',
         item: item,
         userName: userName,
         loginButton: loginButton
     }
    res.render('item',{data: data});
  }
});

router.get('/categories/:categoryName',function(req,res){
    var categories = [];
    categories.push(req.params.categoryName);
    console.log("Category:"+ categories);
    var categoryList = getCategories();
    console.log("Category List:"+ categoryList);
    var itemData = itemDb.getItems();
    console.log(categoryList.includes(categories));
    if(categoryList.includes(categories)){
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
        var data = {
            title:'Categories',
            categories: categoryList,
            items: itemData ,
            userName: userName,
            loginButton: loginButton
        }
        res.render('categories',{data:data});
    }
    
});

router.get('/categories',function(req,res){
    var categories = getCategories();
    var itemData = itemDb.getItems();
    var data = {
        title:'Categories',
        categories: categories,
        items: itemData,
        userName: userName,
        loginButton: loginButton
    }
    res.render('categories',{data:data});
 });
 
router.get('/contact',function(req,res){
    var data = {
        title:'Contact Us',
        userName: userName,
        loginButton: loginButton
    }
    res.render('contact',{data:data});
});

router.get('/about',function(req,res){
    
   var data={
    title: 'About Us',
    userName: userName,
    loginButton: loginButton
    }
    res.render('about',{data:data});     
    
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
