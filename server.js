const express = require('express');
const app = express();
const http = require('http').Server(app);
const weather = require('./src/js/get-weather.js');
const fs = require('fs');
const api = require('./api.js');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dataReader = require('./src/js/data-reader.js')

const port = 5150;
// const router = express.Router();

const path = 'http://10.0.0.35';
// const path = 'http://73.162.245.173';

//  Set minutes for polling weather station...
const minutes = 20;

//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  port: '3306',
});

function getWeatherData(data) {
  return data;
}

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
  // pollWeather(minutes);
});

app.get('/read', (req, res) => {
  // const data = connection.query('SELECT * FROM `weather`.`data_table` order by id desc limit 15', (err, data, fields) => {
  //   if (err) {
  //     console.log(`Error: ${err}`);
  //   }
  //   data = JSON.stringify(data);
  // });
  // res.send(data);
  let data = JSON.stringify(dataReader(connection, getWeatherData));
  res.send(getWeatherData(data));
});
//  Start polling and collecting data...
pollWeather(minutes);

function toMinutes(n) {
  return n * 60 * 1000;
};

function pollWeather() {
  const pollInterval = toMinutes(minutes);
  setTimeout(() => {
    weather(weatherData, path);
    pollWeather();
  }, pollInterval);
  console.log(`\npolling weather every ${minutes} minutes...\n`)
};

function weatherData (data) {
  console.log('Wrting from server...', data);
  // api.write(JSON.stringify(data) + ',\n');
  query(data);
};

http.listen(port, () => {
  console.log(`Server is listening at on port: ${port}`);
});
