const pubIp = require('public-ip');

//Find out if we're local or away and use the corrosponding IP.
const myIp = (ipCallback, weatherCallback, ipHome, ipAway, port) => {
  pubIp.v4().then(ip => {
    let path = 'http://';
    console.log(`my current IP is: ${ip}`);
    if (ip === ipAway) {    // We check to see if our current IP is our home network's outside facing
      path += ipHome; // If it is, we use the local network to get pull from the station.
    } else {
      path += ipAway;
    }
    ipCallback(path, weatherCallback, port);
  });
};

module.exports = myIp;
