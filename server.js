const Client = require('node-rest-client').Client;
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const mysql = require('mysql');
const bodyParser = require('body-parser');

const pool = require('./src/server/pool');
const reader = require('./src/server/data-reader')
// const weather = require('./src/server/get-weather');
const api = require('./api');

const port = 5150;
const router = express.Router();

const path = 'http://10.0.0.35';
// const path = 'http://73.162.245.173';

//  Set minutes for polling weather station...
const minutes = 15;
const client = new Client();

//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getWeatherData(data) {
  return data;
};

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/public/index.html');
});

function toMinutes(n) {
  return n * 60 * 1000;
};

function pollWeather() {
  const pollInterval = toMinutes(minutes);
  reader(path, weatherData);
  setTimeout(() => {
    pollWeather();
  }, pollInterval);
  console.info(`\npolling weather every ${minutes} minutes...\n`)
};

function weatherData (data) {
  const postData = JSON.stringify(data);
  const options = {
    // hostname: '127.0.0.1',
    path: '/weather',
    method: 'POST',
    port: 5150,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
  }

  console.log('Wrting from server...', data);

  let post = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`Body ${chunk}`);
    });
    res.on('end', () => {
      console.log('writing done!');
    });
  });

  post.on('error', (e) => {
    console.log(`ERROR!! ${e.message}`);
  });

  post.write(postData);
  post.end();
};

pool.init();
api.configure(app);

//  Start polling and collecting data...
pollWeather(minutes);

server.listen(port, () => {
  console.info(`Server is listening on port: ${port}`);
});
