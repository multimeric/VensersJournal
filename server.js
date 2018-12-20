'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var path = require('path')

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/public', express.static('public'));

app.get('/about', function(req, res) {
  res.render('pages/about');
})

app.get(['/', '/rules', '/cr'], function(req, res) {
  res.render('pages/rules');
})

app.get(/^\/[\w]{3}-[\w]{3}$/, function(req, res) {
  res.render('pages/rules')
})

app.get('/mtr', function(req, res) {
  res.render('pages/mtr');
})

app.get('/ipg', function(req, res) {
  res.render('pages/ipg');
})

app.use(function(req, res, next){
    res.status(404).render('pages/404.ejs', {title: "Sorry, page not found"});
});

app.listen(3000);
