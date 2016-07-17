const express = require('express');
const app = express();
const http = require('http').Server(app);
const weather = require('./src/js/get-weather.js');
const fs = require('fs');
const api = require('./api.js');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const port = 5150;
// const router = express.Router();

const path = 'http://10.0.0.35';
// const path = 'http://73.162.245.173';

//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: '3306',
});

function query (data) {
  //  see example of escaping (search insert at https://github.com/mysqljs/mysql)
  connection.query('INSERT INTO `weather`.`data_table` SET ?', data, (err, res) => {
    if (err) {
      console.log('Error:', err);
    };
    console.log(res);
  });
};

app.get('/weather', (req, res) => {
  // res.json({ message: weather() });
  res.send('Hello Weather! :)');

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
  setTimeout(() => {
    weather(weatherData, path);
    pollWeather();
  }, toMinutes(2));
}

function weatherData (data) {
  console.log('Wrting from server...', data);
  // api.write(JSON.stringify(data) + ',\n');
  query(data);
};

http.listen(port, () => {
  console.log(`Server is listening at on port: ${port}`);
});
