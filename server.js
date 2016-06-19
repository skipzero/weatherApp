(() => {
  'use strict';

  const app = require('express')();
  const http = require('http').Server(app);
  const getWeather = require(__dirname + '/public/scripts/main.js');
  // const getPath = 'http://10.0.0.35';
  const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5050;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
  });

  http.listen(port, () => {
    console.log(`Server is listening at ${getPath} on port: ${port}`);
  });
})();
