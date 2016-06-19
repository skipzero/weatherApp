const http = require('http');
  // const getPath = 'http://73.162.245.173/';
const getPath = 'http://10.0.0.35/';
  // const main = require('../scripts/main.js')
(() => {
  const weather = () => {
    return http.get(getPath, (resp) => {
      resp.setEncoding('utf8');

      resp.on('error', (error) => {
        console.log('ERR', error);
      });

      resp.on('data', (data) => {
        console.log('data\n', data, '\n============\n');
      });
    });
  };

  const poll = () => {
    weather();
    setTimeout(poll, 1000);
  };
  poll();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = weather;
  } else {
    window.weather = weather;
  }
})();
