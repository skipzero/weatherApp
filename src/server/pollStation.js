const myIp = require('./myIp');

// const myIp = require('./myIp');
const getData = require('./getData');
const weatherData = require('./weatherData');

const pollStation = (min) => {
  const time = min * 60000;  //  Convert our milliseconds to minutes...

  myIp(getData, weatherData);
  setTimeout(() => {
    pollStation(time);
  }, time);
  console.info(`\npolling weather every ${min} minutes...\n`);
};

module.exports = pollStation;
