const http = require('http');
const convert = require('./converter');
const api = require('../../api');

// console.log('ENV_IP', envIp);
const weather = (callback, path) => {
  http.get(`${path}/FullDataString`, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
      return error;
    });

    resp.on('data', (data) => {
      let respData = data;
      respData = convert(data);
      callback(respData);
    });
  });
};

module.exports = weather;
