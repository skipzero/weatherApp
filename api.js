const fs = require('fs');

const api = {
  read: () => {
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', readingData);
  },

  write: (data) => {
    fs.appendFile(`${__dirname}/db/weather.json`, data, writingData);
  }
};

function readingData (err, res) {
  if (err) {
    console.log('Read Error:', err);
  }
  console.log('Response', res);
};

function writingData (err, res) {
  if (err) {
    console.log('Write Error:', err);
  }
  console.log('Writing Data!');
}

module.exports = api;
