(() => {
  'use strict';

  const app         = require('express')();
  const http        = require('http').Server(app);
  const io          = require('socket.io');
  const getWeather  = require('./scripts/getWeather.js');
  const getPath 	  = 'http://10.0.0.35';
  const port 			  = 5050;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'html/index.html')
  });

  http.listen(port, () => {
    console.log('Server is listening on port: ' + port);
  });
})();
