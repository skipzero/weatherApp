

const weather = require('../models/dataModel');

//  Our CRUD resources router
module.exports = {
  configure: (app) => {
    app.get('/weather', (req, res) => {
      console.log('api get...')
      weather.get(res);
    });

    app.get('/weather/:id', (req, res) => {
      console.log('::::', id)
      weather.get(res);
    });

    app.post('/weather', (req, res) => {
      console.log('api post...')
      weather.create(req.body, res);
    });

    app.put('/weather', (req, res) => {
      console.log('api put...')
      weather.update(req.body, res);
    });

    app.delete('/weather/:id', (req, res) => {
      console.log('api delete...')
      weather.delete(req.params.id, res);
    });
  },
};
