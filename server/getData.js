/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */


const converter = require('./converter');
const https = require('https');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY2;
const location = '37.814264,-122.243132';
// const extWeatherApi = `http://api.darksky.net/forecast/${apiKey}/${location}`;

//  Grabs data from the weather station and passes it to converter module.
const getData = () => {

  const ForecastIo = require('forecastio');
  const forecastIo = new ForecastIo(apiKey);
console.log('APIkey', apiKey);

  forecastIo.forecast('37.8', '-122').then(data => convert(data)).then(data => writeData(data)).catch(error => console.error('Error:', error));

  //const weatherAddress = `https://api.forecast.io/forecast/${process.env.API_KEY}/${location}`;

//  let rawData;
//  https.get(weatherAddress, (resp) => {
//    resp.setEncoding('utf8');
//    resp.on('data', (data) => {
//.console.log('Dattty', data);
//      rawData += data;
//    })
//    resp.on('end', () => {
      // const newData = JSON.parse(rawData);
 //     rawData = rawData.slice(9)
 //     rawData = JSON.parse(rawData);
//console.log('End', rawData);
//      convert(rawData)
//    });
//  });

  function convert(data) {
    console.log(JSON.stringify(data));
//    const newData = JSON.parse(data);
    console.log('Convert', data['latitude'])
  }
};

module.exports = getData;
