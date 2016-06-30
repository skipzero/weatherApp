require('shelljs/global');

(() => {
  const envutil = () => {
    let ssid = '/System/Library/PrivateFrameworks/Apple80211.framework';
    ssid += '/Versions/Current/Resources/airport -I';
    let myIp = exec(ssid);
    const home = 'home';

    console.log('IFCONF', myIp)
    const away = 'away';
    myIp = myIp.output.split('\n');

    myIp.reduce((obj, val) => {
      let objVal = val;
      objVal = objVal.split(':');

      console.log('current', objVal);
      return objVal;
    }, {});

    // if (cur.match('SSID')) {
    //   if (ssid[i] === 'skippinBrooke') {
    //     return home;
    //   }
    // }
    console.log('NodeShell', myIp);
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = envutil;
  } else {
    window.envIp = envutil;
  }
})();
