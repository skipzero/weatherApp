#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
'use strict';

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
dotenv.load();

const io = require('socket.io')(server);

const pollStation = require('./server/pollStation');
const converter = require('./server/converter');
const pool = require('./server/pool');
const api = require('./routes/api');
const path = require('path');
const pages = require('./routes');

const pinger = require('mineping');
const mcIP = 'angerbunny.net';
const color = require('colors/safe');

const mcErr = color.red.bold;
const port = 3000;

const sec = 1000; // set weather to every second
const mins = sec * 300; // use the sec to do the minutes

// let myIp = '10.0.0.35';
let myIp = '73.162.245.175';
if (process.env.NODE_ENV === 'Production') {
  myIp = '73.162.245.173';
}

const iss = 'http://api.open-notify.org/iss-now.json'; // The international space station API.
const stationIp = `http://${myIp}/FullDataString`;
// const stationIp = 'http://73.162.245.173/FullDataString';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(`${__dirname}/public/images/fav/favicon.ico`))
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
app.use('/', pages);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//  Create our connection pool
pool.init();
// api.configure(app);

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
    }, mins);
  }

  function socketSendWeather(ip) {
    http.get(ip, (res) => {
      res.setEncoding('utf8');

      res.on('error', (err) => {
        console.error(`ERROR: ${err}`);
        return err;
      });

      res.on('data', (data) => {
        const cleanData = converter(data);
        socket.emit('weatherData', cleanData);
      });
    });
  }

  function socketSendMineCraft(ip) {
    pinger(2, mcIP, 25565, (err, res) => {
      if (err) {
        console.error(mcErr(`Mine Craft Server Error: ${err}`));
        socket.emit('mcData', err);
        return err;
      }

      console.log('PINGING...', res, err);
      socket.emit('mcData', res);
      return res;
    });
  }

  // socketWeather(stationIp);
  // socketMineCraft(mcIP);

  socket.on('disconnect', () => {
    console.info('Disconnected (serverside)');
    clearTimeout(weatherTimer);
    clearTimeout(mineCraftTimer);
  });
});
