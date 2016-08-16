const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const bodyParser = require('body-parser');

const pollStation = require('./src/server/pollStation')
const pool = require('./src/server/pool');

const myIp = require('./src/server/myIp');
const api = require('./api');

const port = 5150;

//  Set minutes for polling weather station...
const minutes = 15;

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile( `${__dirname}/public/index.html`);
});

pool.init();
api.configure(app);

pollStation(minutes, port);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});


//Find out if we're local or away and use the corrosponding IP.
// function getMyIp(ip) {
//   console.log('My ip is', ip);
//   if (ip === '73.162.245.173') {
//     return path = 'http://10.0.0.35';
//   }
//   return path = 'http://73.162.245.173';
// };

//Set up a self calling function to run at desirted interval
// function pollWeather() {
//   const time = minutes * 60000;  //Convert our milliseconds to minutes...
//   myIp.v4().then(ip => {
//     console.log('my ip here is:', getMyIp(ip))
//     reader(getMyIp(ip), weatherData);
//   });
//
//   setTimeout(() => {
//     pollWeather();
//   }, time);
//   console.info(`\npolling weather every ${minutes} minutes...\n`)
// };

// function weatherData (data) {
//   const postData = JSON.stringify(data);
//   const options = {
//     path: '/weather',
//     method: 'POST',
//     port: port,
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': Buffer.byteLength(postData)
//     },
//   }

  // let post = http.request(options, (res) => {
  //   res.setEncoding('utf8');
  //   res.on('error', err => {
  //     console.error(`ERROR: ${err}`);
  //   });
  //
  //   res.on('data', (chunk) => {
  //     console.log(`Status: ${res.statusCode}`);
  //     console.log(`Headers: ${JSON.stringify(res.headers)}`);
  //     console.log(`Body ${chunk}`);
  //   });
  //   res.on('end', () => {
  //     console.log('writing done!');
  //   });
  // });
  //
  // post.on('error', (e) => {
  //   console.log(`ERROR!! ${e.message}`);
  // });

  // post.write(postData);
  // post.end();
// };

//  Start polling and collecting data...
// pollWeather(minutes);
