#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
const express = require('express');
const app = express();

const compression = require('compression');
// const pubIp = require('public-ip');

const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const io = require('socket.io').listen(server);

const pollStation = require('./server/pollStation');
const converter = require('./server/converter');
// const myIp = require('./server/myIp');
const pool = require('./server/pool');
const api = require('./server/api');

const pinger = require('mineping');
const color = require('colors/safe');

const mcErr = color.red.bold;
const port = 3000;
const sec = 1000; // set weather to every second
const mins = sec * 900; // use the sec to do the minutes

// let myIp = '10.0.0.35';
let myIp = '73.162.245.173';

const stationIp = `http://${myIp}/FullDataString`;
// const stationIp = 'http://73.162.245.173/FullDataString';

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
pollStation(myIp);

// //  SET UP OUR WEBSOCKETS
// //  Websockets via socketio
io.on('connection', (socket) => {
  let weatherTimer;
  let mineCraftTimer;
  //  set our timeout function to 10sec
  function socketWeather(ip) {
    // console.log('Client connected to server (server)');
    weatherTimer = setTimeout(() => {
      socketSendWeather(ip);
      socketWeather(ip);
    }, sec);
  }

  function socketMineCraft(ip) {
    mineCraftTimer = setTimeout(() => {
      socketSendMineCraft(ip);
      socketMineCraft(ip);
    }, mins)
  }

  function socketSendWeather(ip) {
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

  function socketSendMineCraft(ip) {
    function socketMC() {
      pinger(2, 'angerbunny.com', 25565, (err, res) => {
        if (err) {
          console.error(mcErr(`Mine Craft Server Error: ${err}`));
          socket.emit('mcDate', err);
          return err;
        }

        console.log('PINGING...', res, err);
        socket.emit('mcData', res)
        return res;
      });
    }
  }

  socketWeather(stationIp);

  socket.on('disconnect', () => {
    console.info('Disconnected (serverside)');
    clearTimeout(dataTimer);
  });
});
