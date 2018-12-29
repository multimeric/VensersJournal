'use strict';

var express = require('express');
var helpers = require('./helpers')
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/public', express.static('public'));

app.get('/about', function(req, res) {
  res.render('pages/about');
})

app.get('/', function(req, res) {
  res.render('pages/landing');
})

app.get(['/rules', '/cr'], function(req, res) {
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

app.get('/archives/:doc(\\w{3}\\_\\w{6,7})', function(req, res) {
  res.render('pages/archives/' + req.params.doc + '.ejs');
})

app.get('/archives', function(req, res) {
  var ipg = helpers.parseDocFiles(fs.readdirSync('static/ipg/'));
  var mtr = helpers.parseDocFiles(fs.readdirSync('static/mtr/'));
  var mcr = helpers.parseCRFiles(fs.readdirSync('static/rules/'));
  res.render('pages/archives', {ipg: ipg,
                                mtr: mtr,
                                mcr: mcr });
})

app.use(function(req, res, next){
  res.status(404).render('pages/error_template.ejs', {status: res.statusCode + ': unhandled route'});
});

app.use(function(err, req, res, next) {
  res.status(500).render('pages/error_template.ejs', {status: res.statusCode + ': unknown file'})
});

app.listen(3000);
