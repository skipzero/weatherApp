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

const query = (data) => {
  //  see example of escaping (search insert at https://github.com/mysqljs/mysql)
  //  TODO: add missing params for omysql query insert...
  return connect.query('INSERT INTO data_table SET ?'"`weather`.`data_table` (`id`, `created`, `outTemp`, `outHum`, `inTemp`, `barom`, `alt`, `curWinds`, `curWindG`, `cirWindD`, `rainTot`, `windSpeedMin`, `windSpeedMax`, `windGustMin`, `windGustMax`, `windDirMin`, `windDirMax`, `engMetric`, `station`, `curAirQS`, `curAirQ`) VALUES ('1', '1', '2', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');")


connection.connect((err) => {
  if(err) {
    console.log('Error: ', err);
    return;
  }
  console.log('Connected as', connection.threadId);
});

connection.end((err) => {
  if (err) {
    console.log('Error:', err);
  }
})

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
};

http.listen(port, () => {
  console.log(`Server is listening at on port: ${port}`);
});
