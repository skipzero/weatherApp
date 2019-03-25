/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */


const converter = require('./converter');
const http = require('http');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY;
const location = 'lat=37.82&lon=-122.27';
// const extWeatherApi = `http://api.darksky.net/forecast/${apiKey}/${location}`;

//  Grabs data from the weather station and passes it to converter module.
const getData = () => {

  // const ForecastIo = require('forecastio');
  // const forecastIo = new ForecastIo(apiKey);

  // forecastIo.forecast('37.8', '-122').then(data => {
  //   writeData(converter(data))
  // }).catch(error => console.error('Error:', error));
  const weatherAddress = `http://api.openweathermap.org/data/2.5/weather?${location}&units=imperial&appid=${apiKey}`;
  let rawData;
  http.get(weatherAddress, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    }

    else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
        `Expected application/json but received ${contentType}`);
    }

    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        writeData(converter(parsedData));
      } catch (e) {
        console.error(e);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

module.exports = getData;
