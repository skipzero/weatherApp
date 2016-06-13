(() => {
  'use strict';


  const app = require('express')();
  const http = require('http').Server(app);

  const getPath 	    = 'http://10.0.0.35';
  const port 			    = 5050;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/')
  });

  const getWeather = (resp) => {
  	return http.get(getPath,  (resp) => {
  		resp.setEncoding('utf8');

  		resp.on('data', (data) => {
  			console.log('data', data);
  			body += data;
  		});

  		resp.on('error', (error) => {
  			console.log('ERR', error)
  		})

  		resp.on('end', () => {
  			let parsed = JSON.parse(body);

  			cb({
  				pdata: parsed
  			})
  		})
  	})
  };

  http.listen(port, () => {
    console.log('Server is listening on port: ' + port);
  });
})();
