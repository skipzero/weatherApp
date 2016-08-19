const pubIp = require('public-ip');

  // Find out if we're local or away and use the corrosponding IP.
const myIp = (getDataCB, weatherDataCB) => {
  const ipAway = '73.162.245.173';
  const ipHome = '10.0.0.35';

  pubIp.v4().then(ip => {
    console.log(`my public ip here is: ${ip}`);
    let path = 'http://';
    if (ip === ipAway) { // We check to see if our current IP is our home network's outside facing
      path += ipHome; // If it is, we use the local network to get pull from the station.
    } else {
      path += ipAway;
    }
    console.log(`currently using: ${path}`);
    getDataCB(path, weatherDataCB);
  });
};

module.exports = myIp;
