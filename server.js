(() => {
  'use strict';
  const app = require('express')();
  const http = require('http').Server(app);
  // const weather = require('weather');
  const mysql = require('mysql');

  // const getPath = 'http://10.0.0.35';
  // const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5150;

  let con = mysql.createConnection({
    host: 'localhost',
    user: 'weather',
    password: 'weather',
  });

  con.connect(err => {
    if (err) {
      console.log('Error connecting to DB:', err);
      return;
    }
    console.log('Connection established...');
  });

  con.end(err => {

  })
  app.get('/', (req, res) => {
    console.log('req', req, '\nres', res)
    res.sendFile(__dirname + '/public/html/')
  });

  http.listen(port, () => {
    console.log(`Server is listening at on port: ${port}`);
  });
})();
