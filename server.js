(() => {
  'use strict';
  const express = require('express');
  const app = require('express')();
  const http = require('http').Server(app);
  const weather = require('./src/js/get-weather.js');
  const fs = require('fs');
  // const api = require('./src/js/api.js');

  // const getPath = 'http://10.0.0.35'; docker porter for mysql: 32769
  // const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5150

  //  static file served from...
  app.use(express.static('public'));

  app.get("/weather",function(req,res){
    console.log('Res', res)
    res.send('Getting weathered! ;)')
    // get data and write it to the file
    weather();
  });

  //  Convert time to minutes for easy reading
  //  takes a number (of mins), returns a number (of miliseconds)
  const timeDelay = (n) => {
    return n * 1000 * 60;
  };

  const poll = () => {
    weather();
    setTimeout(poll, timeDelay(0.5));
  };

  http.listen(port, () => {
    console.log(`Server is listening at on port: ${port} \n\n ${weather()}`);
  });
})();
