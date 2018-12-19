var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/about', function(req, res) {
  res.render('pages/about');
})

app.get(['/', '/rules', '/cr'], function(req, res) {
  res.render('pages/rules');
})

app.get('/mtr', function(req, res) {
  res.render('pages/mtr');
})

app.get('/ipg', function(req, res) {
  res.render('pages/ipg');
})

app.listen(8080);
