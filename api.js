const weather = require('./src/models/dataModel');

module.exports = {
  configure: (app) => {
    app.get('/weather', (req, res) => {
      weather.get(res);
    });

    app.post('/weather', (req, res) => {
      weather.create(req.body, res);
    });

    app.put('/weather', (req, res) => {
      weather.update(req.body, res);
    });

    app.delete('/weather/:id', (req, res) => {
      weather.delete(req.params.id, res);
    });
  },
};


// function readingData(err, res) {
//   if (err) {
//     console.log('(fn) Read Error:', err);
//     return err;
//   }
//   return res;
// }
//
// function writingData(err, res) {
//   if (err) {
//     console.log('Write Error:', err);
//   }
//   console.log('Writing from api/writingData fn')
//   return res;
// }
//
// const api = {
//   read: (path) => {
//     console.log('[API] Reading data...');
//     // fs.readFile(path, 'utf-8', readingData);
//   },
//
//   write: (data) => {
//     console.log('[API] Writing data...', data);
//     // fs.appendFile('./db/weather.json', data, writingData);
//   },
// };
//
// module.exports = api;
