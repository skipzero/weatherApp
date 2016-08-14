const myIp = require('public-ip')
//Set up a self calling function to run at desirted interval
function pollWeather() {
  const time = minutes * 60000;  //Convert our milliseconds to minutes...
  myIp.v4().then(ip => {
    console.log('my ip here is:', getMyIp(ip))
    getData(getMyIp(ip), weatherData);
  });

  setTimeout(() => {
    pollWeather();
  }, time);
  console.info(`\npolling weather every ${minutes} minutes...\n`)
};

module.exports = pollWeather;
