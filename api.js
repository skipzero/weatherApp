const fs = require('fs');
const api = {
  get: () => {
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', (err, res) => {
      if (err) {
        console.log('Error:', err);
      }
      console.log('Response', res);
    });
  },
  write: (data) => {
    fs.appendFile(`${__dirname}/db/weather.json`, data, (err) => {
      if (err) {
        console.log('Write Error:', err);
      }
      console.log('Saved weather:', data);
    });
  }
};

module.exports = api;
