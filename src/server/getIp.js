const myIp = require('public-ip');

const getIp = (callback) => {

  myIp.v4().then(ip => {
    console.log('=========  My ip address...', ip)
    return ip;
  });
};

module.exports = getIp;
