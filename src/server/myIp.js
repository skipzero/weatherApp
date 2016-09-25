/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const pubIp = require('public-ip');

  // Find out if we're local or away and use the corrosponding IP.
const myIp = (cb) => {
  const ipAway = '73.162.245.173';
  const ipHome = '10.0.0.35';

  pubIp.v4().then(ip => {
    let ipPath;
    console.log(`my ip currently is: ${ip}`);
    if (ip === ipAway) { // We check to see if our current IP is our home network's outside facing
      ipPath = ipHome; // If it is, we use the local network to get pull from the station.
    }
    else {
      ipPath = ipAway;
    }
    const path = `http://${ipPath}/FullDataString/`;
    console.log('Myip...', path);
    cb(path);
  });
};
module.exports = myIp;
