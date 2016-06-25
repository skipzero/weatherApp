const http = require('http');
const envIp = require('envIp');
//
// console.log('ENV_IP', envIp);
const getPathHm = 'http://10.0.0.35/';
const getPathWy = 'http://73.162.245.173/';
let getPath;

(() => {
  const envIp = () => {
    const bash = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I';
    let ssid = exec(bash);
    const home = getPathHm;
    const away = getPathWy;
    ssid = ssid.split('\n');
    // ssid = JSON.parse(ssid);
    getPath = ssid.forEach((cur, i) => {
      if (cur.match('SSID')) {
        if (ssid[i] === 'skippinBrooke') {
          return home;
        }
      }
      console.log('cur-ssid', cur);
      return away;
    });
    console.log('NodeShell', getPath);
  };

  //  Convert time to minutes for easy reading
  const timeDelay = (n) => {
    return n * 1000 * 60;
  };

  const poll = () => {
    weather();
    setTimeout(poll, timeDelay(2));
  };

  const weather = () => {
    return http.get(getPath, (resp) => {
      resp.setEncoding('utf8');

      resp.on('error', (error) => {
        console.log('ERR', error);
      });

      resp.on('data', (data) => {
        const dataParsed = JSON.parse(data.variables);
        console.log('data\n', dataParsed, '\n============\n', 'time:', timeDelay(5));
      });
    });
  };

  poll();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = weather;
  } else {
    window.weather = weather;
  }
})();
