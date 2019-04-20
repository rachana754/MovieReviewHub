var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var itemDb = require('../utility/ItemDB');
var userdb = require('../utility/UserDB');
var userItemDb = require('../utility/UserItemDB');

// This middleware function will set the welcome header and login button accordingly before any routing is called.
router.get('/*', function (req, res, next) {
    if (req.session.theUser) {
        userName = "Welcome " + req.session.theUser.firstName;
        console.log(req.session.theUser.firstName);
        loginButton = 'Sign Out'

    }
    else {
        userName = 'Not signed in';
        loginButton = 'Sign In';

    }
    next();

});

//This function will make the user login and displays his items in profile page
//In this function session is beign created
router.get('/myItems', async function (req, res) {
    let y = new userdb();
    var userObj = await y.getUser(1);
    let x = new userItemDb();
    var userData = await x.getuserItems();
    var k = new itemDb();
    var itemName = [];
    var itemCategory = [];
    for (var i = 0; i < userData.length; i++) {
        itemData = await k.getItem(userData[i].itemCode);
        itemName[i] = itemData.itemName;
        itemCategory[i] = itemData.catalogCategory;
    }
    if (req.session.theUser) {
        var data = {
            title: 'My Movies',
            userName: "Welcome " + req.session.theUser.firstName,
            userData: userData,
            loginButton: 'Sign Out',
            itemName: itemName,
            itemCategory: itemCategory

        }
        console.log("session is created");
        res.render('myItems', { data: data });
    }
    else {
        var data = {
            title: 'My Movies',
            userName: "Welcome " + userObj.firstName,
            userData: userData,
            loginButton: 'Sign Out',
            itemName: itemName,
            itemCategory: itemCategory
        }
        req.session.theUser = userObj;
        req.session.itemList = userData;
        res.render('myItems', { data: data });
    }

});

//This function will show the feedback page of each item.
//If there is no session or user tries to check feedback of undefined item, it redirects to catalog.
//If there is session and user tries to rate an item which is not in his items list, page directs to catalog.
router.get('/feedback/:itemCode', async function (req, res) {
    var itemCode = req.params.itemCode;
    var session = req.session.theUser;
    var x = new userItemDb();
    var y = new itemDb();
    var item = await y.getItem(itemCode);
    if (session) {
        var userData = await x.getuserItemData(itemCode);
        if (userData) {
            var rating = userData.rating;
            var flag = userData.watchedIt;
        }
        else {
            var userFlag = 0;
        }
    }
    if (item === undefined || session == null || session == undefined || userFlag == 0) {
        var itemData = await y.getItems();
        var categories = await y.getCategories();
        var data = {
            title: 'Categories',
            categories: categories,
            items: itemData,
            userName: userName,
            loginButton: loginButton
        }
        res.render('categories', { data: data });

    }
    else if (session) {
        var data = {
            title: 'Feedback',
            item: item,
            itemData: itemData,
            userName: userName,
            loginButton: loginButton,
            rating: rating,
            flag: flag
        }
        res.render('feedback', { data: data });

    }
});

//This function will delete the item from users profile page.
router.post('/delete', urlencodedParser, async function (req, res) {
    if (req.session.theUser) {
        userName = "Welcome " + req.session.theUser.firstName;
        console.log(req.session.theUser.firstName);
        loginButton = 'Sign Out'

    }
    else {
        userName = 'Not signed in';
        loginButton = 'Sign In';

    }
    var x = req.body.itemCode;
    var k = new userItemDb();
    var items = await k.removeItem(x);
    req.session.itemList = items;
    var y = new itemDb();
    var itemName = [];
    var itemCategory = [];
    for (var i = 0; i < items.length; i++) {
        itemData = await y.getItem(items[i].itemCode);
        itemName[i] = itemData.itemName;
        itemCategory[i] = itemData.catalogCategory;
    }
    var data = {
        title: 'My Movies',
        userName: userName,
        loginButton: loginButton,
        userData: items,
        itemName: itemName,
        itemCategory: itemCategory
    }
    res.render('myItems', { data: data });
});

//This function will add an item to users profile.
router.post('/save', urlencodedParser, async function (req, res) {
    var session = req.session.theUser;
    if (session == null || session == undefined) {
        var x = new itemDb();
        var itemData = await x.getItems();
        var categories = await x.getCategories();
        var data = {
            title: 'Categories',
            categories: categories,
            items: itemData,
            userName: userName,
            loginButton: loginButton
        }
        res.render('categories', { data: data });

    }
    else {
        var x = req.body.itemCode;
        var k = new userItemDb();
        var items = await k.addItem(x);
        req.session.itemList = items;
        console.log(" added items are");
        console.log(items);
        var y = new itemDb();
        var itemName = [];
        var itemCategory = [];
        for (var i = 0; i < items.length; i++) {
            itemData = await y.getItem(items[i].itemCode);
            itemName[i] = itemData.itemName;
            itemCategory[i] = itemData.catalogCategory;
        }
        var data = {
            title: 'My Movies',
            userName: userName,
            loginButton: loginButton,
            userData: items,
            itemName: itemName,
            itemCategory: itemCategory
        }
        res.render('myItems', { data: data });
    }


});

//This function will update item feedback.
router.post('/update', urlencodedParser, async function (req, res) {
    var itemCode = req.body.itemCode;
    var newRating = req.body.rating;
    var newFlag = req.body.radio;
    var userID = req.body.userID;
    var x = new userItemDb();
    var items = await x.updateItem(itemCode, userID, newRating, newFlag);
    req.session.itemList = items;
    var y = new itemDb();
    var itemName = [];
    var itemCategory = [];
    for (var i = 0; i < items.length; i++) {
        itemData = await y.getItem(items[i].itemCode);
        itemName[i] = itemData.itemName;
        itemCategory[i] = itemData.catalogCategory;
    }
    var data = {
        title: 'My Movies',
        userName: userName,
        loginButton: loginButton,
        userData: items,
        itemName: itemName,
        itemCategory: itemCategory
    }
    res.render('myItems', { data: data });

});

//This function signout from the website and destroys session.
router.get('/signout', function (req, res) {
    req.session.destroy(function (err) {
        var data = {
            title: 'Home',
            userName: 'Not signed in',
            loginButton: 'Sign In'
        }
        res.render('index', { data: data });
    });
});

module.exports = router;
