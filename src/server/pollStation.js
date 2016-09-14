const myIp = require('./myIp');
const getData = require('./getData');

//  Set minutes for polling weather station...
const minutes = 10;

const pollStation = () => {
  const delay = minutes * 60000;  //  Convert our milliseconds to minutes...

  myIp(getData);
  setTimeout(() => {
    pollStation();
  }, delay);
  console.info(`\npolling weather every ${minutes} minutes...\n`);
};

module.exports = pollStation;
