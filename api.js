const weather = require('./src/models/dataModel');

//  Our CRUD resources router
module.exports = {
  configure: (app) => {
    app.get('/weather', (req, res) => {
      weather.get(res);
    });

    app.post('/weather', (req, res) => {
      weather.create(req.body, res);
      console.log('Put weather ID is', res.insertId);
    });

    app.put('/weather', (req, res) => {
      weather.update(req.body, res);
    });

    app.delete('/weather/:id', (req, res) => {
      weather.delete(req.params.id, res);
    });
  },
};
