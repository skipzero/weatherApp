const fs = require('fs');

const api = {
  read: () => {
<<<<<<< Updated upstream
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', readingData);
=======
    fs.readFile(`${__dirname}/db/weather.json`, 'utf-8', (err, data) => {
      if (err) {
        console.log('Error:', err);
      }
      console.log('Read', data);
      return data;
    });
>>>>>>> Stashed changes
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
