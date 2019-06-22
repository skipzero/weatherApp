const weather = require('../models/dataModel');

//  Our CRUD resources router
module.exports = {
  configure: (app) => {
    app.get('/weather', (_req, res) => {
      weather.get(res);
    });

    app.get('/last', (_req, res) => {
      weather.getLast(res);
    });

    app.get('/weather/:number', (req, res) => {
      weather.getDesc(req.params.number, res);
    });

    app.post('/weather', (req, res) => {
      weather.create(req.body, res);
    });

    app.put('/weather/:id', (req, res) => {
      weather.update(req.body, res);
    });

    app.delete('/weather/:id', (req, res) => {
      weather.delete(req.params.id, res);
    });
  },
};
