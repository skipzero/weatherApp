const exec = require('shelljs/global').exec;

(() => {
  const envIp = () => {
    const bash = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I';
    let ssid = exec(bash);
    const home = 'home';
    const away = 'away';
    ssid = ssid.split('\n');
    console.log('window', ssid);
    // ssid = JSON.parse(ssid);
    const getPath = ssid.forEach((cur, i) => {
      if (cur.match('SSID')) {
        if (ssid[i] === 'skippinBrooke') {
          return home;
        }
      }
      return away;
    });
    console.log('NodeShell', getPath);
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = envIp;
  } else {
    window.envIp = envIp;
  }
})();
