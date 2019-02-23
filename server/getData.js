/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */


const convert = require('./converter');
// const http = require('http');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY;
// const location = '37.814264,-122.243132';
// const extWeatherApi = `http://api.darksky.net/forecast/${apiKey}/${location}`;

//  Grabs data from the weather station and passes it to converter module.
const getData = () => {
  const ForecastIo = require('forecastio');
  const forecast = new ForecastIo(apiKey);

  forecast.forecast('37.8', '-122').then(data => convert(data.currently)).then(data => writeData(data));


  // let rawData;
  // http.get(extWeatherApi, (resp) => {
  //   resp.setEncoding('utf8');
  //   resp.on('data', (data) => {
  //     rawData += data;
  //   })
  //   resp.on('end', () => {
  //     // const newData = JSON.parse(rawData);
  //     console.log('rawData', typeof rawData);
  //     convert(rawData)
  //   })
  // });
  //
  // function convert (data) {
  //   const newData = JSON.parse(data);
  //   console.log('Convert', newData['latitude'])
  // }

  // console.log('Get data', ip);
  // http.get(extWeatherApi, (resp) => {
  //   resp.setEncoding('utf8');
  //   let rawData;
  //
  //   resp.on('data', (data) => {
  //     rawData += data;
  //     console.log('zeroData: ', data)
  //     debugger;
  //     // writeData(convert(data.currently));
  //     return rawData;
  //   }).on('error', (err) => {
  //     console.error(`ERROR: ${err}\n [getData-module]`);
  //     throw err;
  //   }).on('end', (data) => {
  //     try {
  //       const parsedData = JSON.parse(rawData);
  //       console.log(parsedData);
  //     } catch (e) {
  //       console.log('ERROR:', e);
  //     }
  //   });
  // })
};

module.exports = getData;
