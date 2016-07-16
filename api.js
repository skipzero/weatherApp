const fs = require('fs');

function readingData(err, res) {
  if (err) {
    console.log('(fn) Read Error:', err);
    return err;
  }
  return res;
}

function writingData(err, res) {
  if (err) {
    console.log('Write Error:', err);
  }
  return res;
}

const api = {
  read: (path) => {
    console.log('[API] Reading data...');
    fs.readFile(path, 'utf-8', readingData);
  },

  write: (data) => {
    console.log('[API] Writing data...', data);
    fs.appendFile('./db/weather.json', data, writingData);
  },
};

module.exports = api;
