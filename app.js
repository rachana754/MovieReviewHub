var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({resave: true,secret: 'secretToken', saveUninitialized:true}));
var catalogController = require('./controller/catalogController');
var profileController = require('./controller/profileController');
app.use(catalogController);
app.use(profileController);
app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});
