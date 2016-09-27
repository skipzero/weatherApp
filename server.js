#!/usr/bin/env nodejs
/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
const express = require('express');
const app = express();

const compression = require('compression');

const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const io = require('socket.io').listen(server);

const env = require('./env.js');
const pollStation = require('./src/server/pollStation');
const converter = require('./src/server/converter');

const pool = require('./src/server/pool');
const api = require('./api');
const port = env.servPort;

let weatherIP;
if (process.env.NODE_ENV === 'Production') {
  weatherIP = 'http://73.162.245.173/FullDataString';
} else {
  weatherIP = 'http://10.0.0.35/FullDataString';
}

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
//  Setup the express server to use the following...
app.use(express.static('public'));
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Routs
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

//  Create our connection pool
pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

//  Our server calls the weather station to get our data
pollStation();

//  Websockets via socketio
io.on('connection', (socket) => {
  let dataTimer;
  function socketHandler() {
    http.get(serverIP, (res) => {
      res.setEncoding('utf8');

      res.on('error', (err) => {
        console.error(`ERROR: ${err}`);
        throw err;
      });

      res.on('data', (data) => {
        const cleanData = converter(data);
        socket.emit('weatherData', cleanData);
      });
    });
  }

  //  set our timeout function to 10sec
  function getSockData() {
    console.log('Client connected to server (server)');
    dataTimer = setTimeout(() => {
      socketHandler();
      getSockData();
    }, 10000);
  }

  getSockData();

  socket.on('weatherData', (data) => {
    console.log(`Data From server: ${data}`);
  });

  socket.on('fromClient', (data) => {
    console.log(`caught from client.....${data}`);
  });

  socket.on('disconnect', () => {
    clearTimeout(dataTimer);
  });
});

// io.sockets.on('connection', (socket) => {
//   console.log(color.blue.bold('IO Connection established...'));
//   let updateLoop;
//
//   function ioTimer() {
//     updateLoop = setTimeout(() => {
//       const request = http.get('http://10.0.0.35/weather', (req, res) => {
//         res.on('data', (data) => {
//           socket.emit('weatherData', data);
//         });
//
//         res.on('end', () => {
//           console.log('Finished get request...');
//         });
//       });
//
//       request.on('error', (err) => {
//         console.error(`ERROR: ${err}`);
//       });
//
//       ioTimer();
//     }, 2000);
//   }
//   ioTimer();
//
//   socket.on('weatherData', (data) => {
//     ioTimer();
//     console.log('weatherData', data);
//   });
//
//   socket.on('disconnect', (data) => {
//     console.log(color.red.bold(`IO user disconnected... ${data}`));
//     clearTimeout(updateLoop);
//   });
// });
