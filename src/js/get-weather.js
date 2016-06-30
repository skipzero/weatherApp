const http = require('http');
const envutil = require('./env-util');

//
// console.log('ENV_IP', envIp);
(() => {
  const getPathHm = 'http://10.0.0.35/FullDataString';
  const getPathWy = 'http://73.162.245.173/';
  let getPath = getPathHm;

  //  Convert time to minutes for easy reading
  //  takes a number (of mins), returns a number (of miliseconds)
  const timeDelay = (n) => {
    return n * 1000 * 60;
  };

  const weather = () => {
    return http.get(getPath, (resp) => {
      resp.setEncoding('utf8');

      resp.on('error', (error) => {
        console.log('ERR', error);
      });

      resp.on('data', (data) => {
        const dataParsed = JSON.parse(data);
        console.log('data\n', dataParsed, '\n============\n' );
      });
    });
  };

  const poll = () => {
    weather();
    setTimeout(poll, timeDelay(.1));
  };
  poll();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = weather;
  } else {
    window.weather = weather;
  }
})();
