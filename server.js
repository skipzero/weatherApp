#!/usr/bin / env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const favicon = require('serve-favicon');

const dotenv = require('dotenv');
dotenv.config()

// const graphqlController = require('./controller/graphqlController');

// const getData = require('./server/getData');

const WeatherAPI = require('ambient-weather-api');

const converter = require('./server/converter');
const writeData = require('./server/writeData');

const pool = require('./server/pool');
const path = require('path');
const pages = require('./routes');

const port = 3000 || process.env.PORT;
const apiKey = process.env.API_KEY;
const appKey = process.env.APP_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(`${__dirname}/public/images/fav/favicon.ico`));
app.use(logger('dev'));

// app.use('./controllers/graphqlController')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.use('*', (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', pages);

//  Create our connection pool
pool.init();

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
  const serverData = getData(apiKey, appKey); // Our server calls the weather station to subscribe and get our data
});


const getData = (apiKey, appKey) => {
  let data;

  const api = new WeatherAPI({
    apiKey: apiKey,
    applicationKey: appKey,
  });

  function getName(device) {
    console.log('DEVICE:::', device.info);
    return device.info;
  }

  api.connect();
  api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'));

  api.on('subscribed', data => {
    console.log(`Subscribed to ${data.devices.length} device(s): \n\n
    ${getName(data.devices)}`);
  });

  api.on('data', data => {
    const convertedData = converter(data);
    api.newData = convertedData;
    writeData(convertedData);
    return convertedData;
  });

  api.subscribe(apiKey);
  return api;
}
