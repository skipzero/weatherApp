'use strict';

const getPath 	    = 'http://10.0.0.35';
const http   		    = require('http');
const mockData      = require('../data.js');
const port 			    = 5050;

const server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(`<!DOCTYPE html>
									<html>
									<head>
									<title>Hello World Page</title>
									</head>
									<body>
									Hello World!
									</body>
									</html>`);
  response.end();
});

const getWeather = (resp) => {
	return http.get(getPath,  (resp) => {
		resp.setEncoding('utf8');
		let body = '';

		resp.on('data', (data) => {
			console.log('data', data);
      weatherObject();
			body += data;
		});

		resp.on('error', (error) => {
			console.log('ERR', error)
		});

		resp.on('end', () => {
			let parsed = JSON.parse(body);

			cb({
				pdata: parsed
			})
		});
	});
};

server.listen(port);
console.log('Server is listening on port: ' + port);
