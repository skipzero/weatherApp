(() => {
  'use strict';
  const main = require(__dirname + '/public/scripts/main.js')
  console.log('MAIN', main);

  const app = require('express')();
  const http = require('http').Server(app);
  // const getPath = 'http://10.0.0.35';
  // const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5050;

  app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
  });

  http.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
})();
