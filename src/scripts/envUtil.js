require('shelljs/global');

(() => {
  const envIp = () => {
    const bash = '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I';
    let ssid = exec(bash);
    const home = 'home';
    const away = 'away';
    ssid = ssid.split('\n');
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
    console.log('module', envIp);
    module.exports = envIp;
  } else {
    console.log('window', envIp);
    window.envIp = envIp;
  }
})();
