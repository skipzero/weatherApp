/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
'use strict';

const pubIp = require('public-ip');

  // Find out if we're local or away and use the corrosponding IP.
const myIp = (cb) => {
  const ipAway = '73.162.245.173';
  const ipHome = '10.0.0.35';

  pubIp.v4().then(ip => {
    let ipPath;
    console.info(`my ip currently is: ${ip}`);
    if (ip === ipAway) { // We check to see if our current IP is our home network's outside facing
      ipPath = ipHome; // If it is, we use the local network to get pull from the station.
    }
    else {
      ipPath = ipAway;
    }
    console.info('IP INFO', ipPath);
    const path = 'https://api.darksky.net/forecast/1ab99e681f44158ccbb9cc5ed752cc0b/37.814264,-122.243132';
    cb(path);
    return path;
  });
};
module.exports = myIp;
