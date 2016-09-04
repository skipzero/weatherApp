const convert = require('./converter');
const http = require('http');

//  Grabs data from the weather station and passes it to converter module.
const getData = (path, callback) => {
  http.get(`${path}/FullDataString`, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
      throw error;
    });

    resp.on('data', (data) => {
      console.info('getData', data)
      callback(convert(data));
    });
  });
};

module.exports = getData;
