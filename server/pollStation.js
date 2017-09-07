/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
'use strict';

// const myIp = require('./myIp');
const getData = require('./getData');

//  Set minutes for polling weather station...
const delay = 10 * 60 * 1000; // set for 10 minutes

const pollStation = (ip) => {

  getData(ip);
  setTimeout(() => {
    pollStation(ip);
  }, delay);
};

module.exports = pollStation;
