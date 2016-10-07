#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
const express = require('express');
const app = express();

const compression = require('compression');
const pubIp = require('public-ip');

const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const io = require('socket.io').listen(server);

const pollStation = require('./server/pollStation');
const converter = require('./server/converter');
// const myIp = require('./server/myIp');
const pool = require('./server/pool');
const api = require('./server/api');
const port = 3000;

const home = 'http://10.0.0.35/FullDataString';
const away = 'http://73.162.245.173/FullDataString';

let weatherIP;

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

//  SET UP OUR WEBSOCKETS
//  Websockets via socketio
io.on('connection', (socket) => {
  let dataTimer;
  function socketHandler(ip) {
    console.log('SockHand', ip)
    http.get(ip, (res) => {
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
  function getSockData(ip) {
    console.log('Client connected to server (server)');
    dataTimer = setTimeout(() => {
      socketHandler(ip);
      getSockData();
    }, 10000);
  }

  getSockData(away);

  // pubIp.v4().then(ip => {
  //   let ipPath;
  //   if (ip === '73.162.245.173') {
  //     ipPath = '10.0.0.35';
  //   }
  //   else {
  //     ipPath = '73.162.245.173';
  //   }
  //   ipPath = `http://${ipPath}${urlSuffix}`;
  //   getSockData(ipPath);
  // });

  socket.on('weatherData', (data) => {
    console.log(`Data From server: ${data}`);
  });

  socket.on('fromClient', (data) => {
    console.log(`caught from client.....${data}`);
  });

  socket.on('disconnect', () => {
    console.info('Disconnected (serverside)');
    clearTimeout(dataTimer);
  });
});
