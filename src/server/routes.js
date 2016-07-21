var weather = require('../models/dataModel');

module.exports = {
  configure: function(app) {
    app.get('/weather/', function(req, res) {
      weather.get(res);
    });

    app.post('/weather/', function(req, res) {
      weather.create(req.body, res);
    });

    app.put('/weather/', function(req, res) {
      weather.update(req.body, res);
    });

    app.delete('/weather/:id/', function(req, res) {
      weather.delete(req.params.id, res);
    });
  }
};
