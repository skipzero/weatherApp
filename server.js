const express = require('express');
const app = express();
const hbs = require('express-handlebars');

const http = require('http');
const server = http.Server(app);
const bodyParser = require('body-parser');

const pollStation = require('./src/server/pollStation');
const pool = require('./src/server/pool');

const api = require('./api');

const port = 51500;

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
app.engine('hbs', hbs({ extname: 'hbs', defaultlayout: 'main', layoutsDir: `${__dirname}/views/layouts` }));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.render('index');
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/temp', (req, res) => {
  res.render('index');
  // res.sendFile( `${__dirname}/public/index.html`);
});

pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

// pollStation();
