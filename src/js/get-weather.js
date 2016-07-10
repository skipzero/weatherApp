const http = require('http');
// const envutil = require('./env-util.js');
const convert = require('./converter.js');
//
// console.log('ENV_IP', envIp);
(() => {
  const weather = () => {
    const getPathHm = 'http://10.0.0.35/FullDataString';
    const getPathWy = 'http://73.162.245.173/FullDataString';

    let getPath = getPathHm;

    //  Convert time to minutes for easy reading
    //  takes a number (of mins), returns a number (of miliseconds)

    return http.get(getPath, (resp) => {
      resp.setEncoding('utf8');

      resp.on('error', (error) => {
        console.log('ERR', error);
      });

      resp.on('data', (data) => {
        convert(data);
        console.log('data\n', data, '\n============\n');
      });
    });
  };

  const timeDelay = (n) => {
    return n * 1000 * 60;
  };

  const poll = () => {
    weather();
    setTimeout(poll, timeDelay(15));
  };
  poll();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = weather;
  } else {
    window.weather = weather;
  }
})();
