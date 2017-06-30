var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

load('app/routes')
    .then('app/controllers')
    .into(app);

app.use(function(err, req, res, next){
	res.status(500).render('errors/500');
	next();
});

module.exports = app;