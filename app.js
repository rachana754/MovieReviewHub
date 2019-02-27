var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
var catalogController = require('./controller/catalogController');
//  routes defining
app.use('/', catalogController);
app.use('/myItems', catalogController);
app.use('/categories/item/:itemCode',catalogController);
app.use('/categories/:categoryName',catalogController);
app.use('/categories',catalogController);
app.use('/contact', catalogController);
app.use('/about', catalogController);
app.use('/feedback',catalogController);
app.listen(8080,function(){
    console.log('app started')
    console.log('listening on port 8080')
});