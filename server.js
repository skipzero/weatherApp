const express = require('express');
const app = express();
const exhbs = require('express-handlebars');

const http = require('http');
const server = http.Server(app);
const bodyParser = require('body-parser');

const pollStation = require('./src/server/pollStation');
const pool = require('./src/server/pool');

const api = require('./api');

const port = 5150;

//  Set minutes for polling weather station...
const minutes = 15;

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
// app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
  // res.sendFile( `${__dirname}/public/index.html`);
});

pool.init();
api.configure(app);

pollStation(minutes);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
