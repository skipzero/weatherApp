import weather from '../models/dataModel';

//  Our CRUD resources router
const API = {
  configure: (app) => {
    app.get('/weather', (req, res) => {
      console.log('api get...')
      weather.get(res);
    });

    app.get('/last', (req, res) => {
      console.log('api get last...')
      weather.getLast(res);
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

export default API;
