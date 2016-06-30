(() => {
  'use strict';
  const app = require('express')();
  const http = require('http').Server(app);
  // const getPath = 'http://10.0.0.35';
  const getPath = 'http://73.162.245.173/';  //  OUtside local network
  const port = 5150;
console.log(app)
  app.get('/', (req, res) => {
    res.sendFile('/public/html/index.html')
  });

  http.listen(port, () => {
    console.log(`Server is listening at on port: ${port}`);
  });
})();
