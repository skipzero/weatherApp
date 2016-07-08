const express = require('express');
const app = express();
const http = require('http').Server(app);
const weather = require('./src/js/get-weather.js');
const fs = require('fs');
const api = require('./api.js');
const bodyParser = require('body-parser');

(() => {
  'use strict';
  const port = 5150;
  const router = express.Router();

  //  static file served from...
  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('api/', router);

  app.get('/weather', (req, res) => {
    res.json({ message: weather() });
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', (err, data) => {
      // console.log('read', data);
      // res.end(data);
    });
    console.log('Res');
    // get data and write it to the file
    console.log('appGet', weather());
  });

  app.post('weather', (req, res) => {
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', (err, data) => {

    });

  });

  http.listen(port, () => {
    console.log(`Server is listening at on port: ${port} \n\n ${weather()}`);
  });
})();
