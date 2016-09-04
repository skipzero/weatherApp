const express = require('express');
const app = express();
// const exphbs = require('express-handlebars');

const http = require('http');
const server = http.Server(app);
const bodyParser = require('body-parser');
const debug = require('debug')('http');

const pollStation = require('./src/server/pollStation');
const pool = require('./src/server/pool');

const api = require('./api');

const name = 'weather-app';
const port = 51500;

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
// app.engine('.hbs', exphbs({ extname: '.hbs' }));
// app.set('views', 'path.join(__dirname', 'views'));
// app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

debug('Starting %s', name);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  debug(`Root ${req.method} ${req.url}`);
  res.render('index');
  // res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/temp', (req, res) => {
  res.render('layouts/main');
  // res.sendFile( `${__dirname}/public/index.html`);
});

pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

pollStation();
