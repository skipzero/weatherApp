/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const convert = require('./converter');
const http = require('http');
const writeData = require('./writeData');

//  Grabs data from the weather station and passes it to converter module.
const getData = (ip) => {
  console.log('Get data', ip);
  http.get(`http://${ip}/FullDataString`, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (err) => {
      console.error(`ERROR: ${err}\n [getData-module]`);
      throw err;
    });

    resp.on('data', (data) => {
      writeData(convert(data));
    });
  });
};

module.exports = getData;
