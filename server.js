'use strict';

var assist = require('./static/res/assist')
var express = require('express');
var helpers = require('./static/res/helpers')
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var date = new Date();
var app = express();
var https = require('https');
var request = require('request-promise');

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
            		  res.status(500).render('pages/error_template', {status: res.statusCode + ': The CR route you tried doesn\'t exist. At all. And never will.'})
            		  console.log(err)
                } else {
                  rules = assist.getRules(data);
		  if (rules.length === 2) {
		    res.render('pages/gief')
                  } else {
                    res.render('pages/rules', {rules: rules})
                  }
                }
              });
})

app.get('/:rule(\\d{1,3}[\\.]\\w{1,4})', function (req, res) {
  var ruleNum = req.params.rule;
  console.log(date.toLocaleDateString(), ": Requested STANDALONE RULE: ", ruleNum);
//  var rule = get('https://slack.vensersjournal.com/rule/'+ruleNum);
//  var examples = get('https://slack.vensersjournal.com/example/'+ruleNum);
//  console.log(rule, '??');
//  console.log(examples, '?!');
//  res.render('pages/specific_rule', {rule: rule, examples: examples});
  const urls = ['https://slack.vensersjournal.com/rule/'+ruleNum, 'https://slack.vensersjournal.com/example/'+ruleNum]
  const promises = urls.map(url => request(url));
  Promise.all(promises).then((data) => {
    var rule = JSON.parse(data[0]);
    var examples = JSON.parse(data[1]);
    res.render('pages/specific_rule', {rule: rule, examples: examples});
  });

//  https.get('https://slack.vensersjournal.com/rule/'+ruleNum, (resp) => {
//      resp.on('data', (ruleData) => {
//          https.get('https://slack.vensersjournal.com/example/'+ruleNum, (re) => {
//            re.on('data', (exData) => {
//              examples = JSON.parse(exData)
//            });
//	  });
//          rule = JSON.parse(ruleData);
//      });
//      resp.on('end', () =>  res.render('pages/specific_rule', {rule: rule, examples: examples}));
//  });
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

function get(url) {
  https.get(url, (res) => {
    res.on('data', (data) => {
      return JSON.parse(data)
    });
  });
}
