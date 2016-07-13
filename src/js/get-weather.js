const http = require('http');
// const envutil = require('./env-util.js');
const convert = require('./converter.js');
const api = require('../../api.js');

// console.log('ENV_IP', envIp);
const weather = (callback) => {
  const getPathHm = 'http://10.0.0.35/FullDataString';
  // const getPathWy = 'http://73.162.245.173/FullDataString';
  const getPath = getPathHm;

  http.get(getPath, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
      return error;
    });

    resp.on('data', (data) => {
      let respData = data;
      respData = convert(data);
      console.log('converted data...', respData);
      callback(respData);
      // console.log('Writing...', respData);
      // api.write(respData);
    });
  });
};

module.exports = weather;
