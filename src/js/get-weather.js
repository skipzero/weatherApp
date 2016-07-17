const http = require('http');
// const envutil = require('./env-util.js');
const convert = require('./converter.js');
const api = require('../../api.js');

// console.log('ENV_IP', envIp);
const weather = (callback, path) => {
  http.get(`${path}/FullDataString`, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
      return error;
    });

    resp.on('data', (data) => {
      console.log('Weather Resp', data);
      let respData = data;
      respData = convert(data);
      console.log(`converted data... ${respData}`);
      callback(respData);
      // console.log('Writing...', respData);
      // api.write(respData);
    });
  });
};

module.exports = weather;
