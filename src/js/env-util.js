require('shelljs/global');
let exec;

(() => {
  const envUtil = () => {
    let bash = '/System/Library/PrivateFrameworks/Apple80211.framework';
    bash += '/Versions/Current/Resources/airport -I';
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
    module.exports = envUtil;
  } else {
    window.envIp = envUtil;
  }
})();
