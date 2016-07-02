(() => {
  'use strict';
  const express = require('express');
  const app = require('express')();
  const http = require('http').Server(app);
  const weather = require('./src/js/get-weather.js');
  const mysql = require('mysql');

  // const getPath = 'http://10.0.0.35'; docker porter for mysql: 32769
  // const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5150;

  let con = mysql.createConnection({
    host: 'localhost',
    port: '32769',
    user: 'weather',
    password: 'weather',
  });

  //  static file served from...
  app.use(express.static('public'));

  // con.connect(err => {
  //   if (err) {
  //     console.log('Error connecting to DB:', err);
  //     return;
  //   }
  //   console.log('Connection established...');
  // });
  //
  // con.end(err => {
  //
  // });

  app.get('/', (req, res) => {
    console.log(weather());
    res.sendFile(__dirname + '/public/index.html');
  });

  http.listen(port, () => {
    console.log(`Server is listening at on port: ${port}`);
  });
})();
