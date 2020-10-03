'use strict';

var assist = require('./static/res/assist');
var helpers = require('./static/res/helpers');
var cardList = require('./static/res/cardlist').getCardList();


var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var date = new Date();
var app = express();
var https = require('https');
var request = require('request-promise');
const sectionJson = require('../Southfall/testOutput.json');
app.locals.sectionJson = sectionJson;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/public', express.static('public'));

app.get('/about', function(req, res) {
  res.render('pages/about');
})

app.get('/changelog', function(req, res) {
  res.render('pages/changelog');
})

app.get('/', function(req, res) {
  res.render('pages/landing');
})


app.get('/:diff([\\w]{3}\\-[\\w]{3})', function(req, res) {
  var rules;
  fs.readFile('public/assets/cr-diffs/'
              + req.params.diff
              + '.json', 'utf8',
              (err, data) => {
                if (err) {
            		  res.status(500).render('pages/error_template', {status: res.statusCode + ': The CR route you tried doesn\'t exist. At all. And never will.'});
                } else {
                  rules = assist.getRules(data);
		              if (rules.length < 2) {
		              res.render('pages/gief')
                  } else {
                    res.render('pages/rules', {rules: rules})
                  }
                }
              });
})

app.get('/:section(\\d{3,})(\.:anchor(\\w{1,4}))?', function (req, res) {
  let anchor = req.params.anchor;
  let section= req.params.section;
  console.log(date.toLocaleDateString(), ": Requested SECTION: ", section);
  var options = { uri: 'https://slack.vensersjournal.com/section/'+section,
                  json: true  }
  request(options).then(function (data) {
    if (anchor) {
      anchor = '_' + anchor;
    } else {
      anchor = null
    }
    let getExampleCards = require('./public/assets/scripts/exampleCards');
    res.render('pages/section', { section: data, anchor: anchor, helpers: getExampleCards });
  })
  .catch(function (err) {
    console.log(err);
    res.render('pages/error_template', { status: '400: Section not found: ' + section });
  });
})

app.get('/mtr', function(req, res) {
  res.render('pages/mtr');
})

app.get('/ipg', function(req, res) {
  res.render('pages/ipg');
})

app.get('/archives/:doc(\\w{3}\\_\\w{6,7})', function(req, res) {
  res.render('pages/archives/' + req.params.doc);
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
  res.status(404).render('pages/error_template', {status: res.statusCode + ': unhandled route'});
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).render('pages/error_template', {status: res.statusCode + ': unknown file'})
});

app.listen(3000);