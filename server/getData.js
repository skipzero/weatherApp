/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */


const convert = require('./converter');
const https = require('https');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY;
const location = '37.814264,-122.243132';
// const extWeatherApi = `http://api.darksky.net/forecast/${apiKey}/${location}`;

//  Grabs data from the weather station and passes it to converter module.
const getData = () => {

  const ForecastIo = require('forecastio');
  const forecastIo = new ForecastIo(apiKey);

  forecastIo.forecast('37.8', '-122').then(data => convert(data.currently)).then(data => writeData(data)).catch(error => console.error('Error:', error));

  const weatherAddress = `https://api.forecast.io/forecast/${process.env.API_KEY}/${location}`;

  let rawData;
  https.get(weatherAddress, (resp) => {
    resp.setEncoding('utf8');
    resp.on('data', (data) => {
      rawData += data;
    })
    resp.on('end', () => {
      // const newData = JSON.parse(rawData);
      rawData = rawData.slice(9)
      rawData = JSON.parse(rawData);
      rawData = rawData.currently;
      convert(rawData)
    });
  });

  function convert(data) {
    const newData = JSON.parse(data);
    console.log('Convert', newData['latitude'])[0]
  }
};

module.exports = getData;
