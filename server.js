const express = require('express');
const app = express();
const http = require('http').Server(app);
const weather = require('./src/js/get-weather.js');
const fs = require('fs');
const api = require('./api.js');
const bodyParser = require('body-parser');

const port = 5150;
const router = express.Router();

//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('api/', router);

app.get('/weather', (req, res) => {
  // res.json({ message: weather() });
  fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', (err, res) => {
    console.log('read', data);
    res.end(data);
  });

  if (req) {
    console.log('Requested...');
  }
  // get data and write it to the file
  pollWeather()
});
function pollWeather() {
  setTimeout(() => {
    weather(weatherData);
    pollWeather();
}, 15 * 60 *1000);
}
function weatherData (data) {
  api.write(JSON.stringify(data) + '\n');
};

http.listen(port, () => {
  console.log(`Server is listening at on port: ${port}`);
});
