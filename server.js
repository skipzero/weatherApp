const express = require('express');
const app = express();
const http = require('http').Server(app);
const weather = require('./src/js/get-weather.js');
const fs = require('fs');
const api = require('./api.js');
const bodyParser = require('body-parser');

const port = 5150;
const router = express.Router();

const path = 'http://10.0.0.35';
// const path = 'http://73.162.245.173';

//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/weather', (req, res) => {
  // res.json({ message: weather() });
  res.json({ message: api.read(`db/weather.json`) });

  // res.send(res);
  if (req) {
    console.log('Requested...');
  }
  // get data and write it to the file
  pollWeather();
});

app.get('/read', (req, res) => {
  res.send(api.read('db/weather.json'))
});

function toMinutes(n) {
  return n * 60 * 1000;
};

function pollWeather() {
  const minutes = toMinutes(15);
  setTimeout(() => {
    weather(weatherData, path);
    pollWeather();
    console.log(`polling every ${minutes}...`)
  }, minutes;
};

function weatherData (data) {
  console.log('Wrting from server...', data);
  api.write(JSON.stringify(data) + ',\n');
};

http.listen(port, () => {
  console.log(`Server is listening at on port: ${port}`);
});
