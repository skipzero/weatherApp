const http = require('http');
// const envutil = require('./env-util.js');
const convert = require('./converter.js');
// const api = require('./api.js');

// console.log('ENV_IP', envIp);
const weather = (callback) => {
  const getPathHm = 'http://10.0.0.35/FullDataString';
  const getPathWy = 'http://73.162.245.173/FullDataString';
  const getPath = getPathHm;

  let data = http.get(getPath, (resp) => {
    resp.setEncoding('utf8');

    resp.on('error', (error) => {
      console.info('ERR', error);
    });
    
    resp.on('data', (data) => {
      const conData = convert(data);
      console.log('converted data...', conData);
      callback(conData);
      // console.log('data\n', data, '\n============\n');
    });
  });
};

module.exports = weather;
