const myIp = require('./myIp');

// const myIp = require('./myIp');
const getData = require('./getData');
const weatherData = require('./weatherData');

const ipAway = '73.162.245.173';
const ipHome = '10.0.0.35';

const pollStation = (min, port) => {
  const time = min * 60000;  //Convert our milliseconds to minutes...

    console.log(`my ip here is: ${myIp()}`);
    // getData(myIp(), weatherData);
    myIp(getData, weatherData, ipHome, ipAway, port);

  setTimeout(() => {
    pollStation(time);
  }, time);
  console.info(`\npolling weather every ${min} minutes...\n`)
};

module.exports = pollStation;
