var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var itemDb = require('../utility/ItemDB');
var userdb = require('../utility/UserDB');
var userItemDb = require('../utility/UserItemDB');
const {check,validationResult } = require('express-validator/check');

var errorArray = [];
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

router.get('/signIn', function (req, res) {
    var data = {
        title: 'Sign In',
        userName: userName,
        loginButton: loginButton
    }
    res.render('login', { data: data });
});

router.post('/signIn', urlencodedParser, 
[check('username','Username should contain atleast 5 characters').isLength({ min:5 }),
check('username','Username is required').not().isEmpty(),
check('password','Password should contain atleast 5 characters').isLength({ min:5 }),
check('password','Password is required').not().isEmpty()],
async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
        //console.log(errors.array());
         errorArray = [];
        if(errors.array() != undefined){
            errors.array().forEach(function(e){
                errorArray.push(e.msg);
            });
        }
        var data = {
            title: 'Sign In',
            userName: userName,
            loginButton: loginButton,
            errorArray: errorArray
        }
        res.render('login', { data: data });
	} else {
		console.log("no errors in signIn of user");
	}
    
    let y = new userdb();
    var userObj = await y.getUserName(username);
    console.log("hey usr");
    console.log(userObj);
    if (userObj) {
        var usernameActual = userObj.username;
        var passwordActual = userObj.password;
    }
   
     if (username != usernameActual || password != passwordActual) {
        var notvalid = true;
        var data = {
            title: 'Sign In',
            userName: userName,
            loginButton: loginButton,
            valid: notvalid
        }
        res.render('login', { data: data });
    }
    else if (username == usernameActual && password == passwordActual) {
        let x = new userItemDb();
        var userData = await x.getuserItems(userObj.userID);
        var k = new itemDb();
        var itemName = [];
        var itemCategory = [];
        for (var i = 0; i < userData.length; i++) {
            itemData = await k.getItem(userData[i].itemCode);
            itemName[i] = itemData.itemName;
            itemCategory[i] = itemData.catalogCategory;
        }
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
        console.log("my user in login Data" +  userData);
        res.render('myItems', { data: data });
    }
});
//This function will make the user login and displays his items in profile page
//In this function session is beign created
router.get('/myItems', async function (req, res) {

    if (!req.session.theUser) {
        var data = {
            title: 'Sign In',
            userName: userName,
            loginButton: loginButton
        }
        res.render('login', { data: data });
    }
    else {
        var userObj = req.session.theUser;
        console.log("my user");
        console.log(userObj);
        var userData = req.session.itemList;
        console.log(req.session.itemList);
        console.log("my userData");
        console.log(userData);
        var k = new itemDb();
        var itemName = [];
        var itemCategory = [];
        for (var i = 0; i < userData.length; i++) {
            itemData = await k.getItem(userData[i].itemCode);
            itemName[i] = itemData.itemName;
            itemCategory[i] = itemData.catalogCategory;
        }
        var data = {
            title: 'My Movies',
            userName: "Welcome " + userObj.firstName,
            userData: userData,
            loginButton: 'Sign Out',
            itemName: itemName,
            itemCategory: itemCategory
        }

        res.render('myItems', { data: data });
    }

});

//This function will show the feedback page of each item.
//If there is no session or user tries to check feedback of undefined item, it redirects to catalog.
//If there is session and user tries to rate an item which is not in his items list, page directs to catalog.
router.get('/feedback/:itemCode', check('itemCode').isLength({ min:1 }).isNumeric(),async function (req, res) {
    var itemCode = req.params.itemCode;
    var session = req.session.theUser;
    var x = new userItemDb();
    var y = new itemDb();
    var item = await y.getItem(itemCode);
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
	} else {
		console.log("no errors in feedback of item");
	}
    if (session) {
        var userData = await x.getuserItemData(itemCode,session.userID);
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
router.post('/delete', urlencodedParser, check('itemCode').isLength({ min:1 }).isNumeric(), async function (req, res) {
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
	} else {
		console.log("no errors in deleting an item");
	}
    if (req.session.theUser) {
        userName = "Welcome " + req.session.theUser.firstName;
        console.log(req.session.theUser.firstName);
        loginButton = 'Sign Out'

    }
    else {
        userName = 'Not signed in';
        loginButton = 'Sign In';

    }
    var userObj = req.session.theUser;
    var userId = userObj.userID;
    var x = req.body.itemCode;
    var k = new userItemDb();
    var items = await k.removeItem(x,userId);
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
router.post('/save', urlencodedParser, check('itemCode').isLength({ min:1 }).isNumeric(),async function (req, res) {
    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
	} else {
		console.log("no errors in saving an item");
	}
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
        var userId = session.userID;
        var items = await k.addItem(x,userId);
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
router.post('/update', urlencodedParser, 
[check('itemCode').isLength({ min:1 }).isNumeric(),
check('newRating').isLength({ min:1 }).isNumeric(),
check('newFlag').isLength({ min:1 }).isNumeric()],
async function (req, res) {

    var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
	} else {
		console.log("no errors in updating item");
	}
    var itemCode = req.body.itemCode;
    var newRating = req.body.rating;
    var newFlag = req.body.radio;
    var userObj = req.session.theUser;
    var userID = userObj.userID;
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
