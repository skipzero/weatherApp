/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const myIp = require('./myIp');
const getData = require('./getData');

//  Set minutes for polling weather station...
const minutes = 10;

const pollStation = (ip) => {
  const delay = minutes * 60000;  //  Convert our milliseconds to minutes...

  getData(ip);
  setTimeout(() => {
    pollStation(ip);
  }, delay);
};

module.exports = pollStation;
