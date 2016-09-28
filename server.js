#!/usr/bin/env nodejs
/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const express = require('express');
const app = express();

const compression = require('compression');

const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const io = require('socket.io').listen(server);

const pollStation = require('./src/server/pollStation');
const converter = require('./src/server/converter');
const myIp = require('./src/server/myIp')
const pool = require('./src/server/pool');
const api = require('./api');
const port = 3000;

console.log('ENVIRON', process.env.npm_configNODE_ENV);
console.log('My ip formn server is....', myIp())
//  :::SERVER RELATED CODE HERE:::
//  static file served from...
app.use(express.static('public'));
app.use(compression());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

pollStation();

io.on('connection', (socket) => {
  let dataTimer;
  function socketHandler() {
    http.get('http://10.0.0.35/FullDataString', (res) => {
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

  function getSockData() {
    dataTimer = setTimeout(() => {
      socketHandler();
      getSockData();
    }, 10000);
  }

  console.log('Client connected to server (server)');
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
