/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
const WeatherAPI = require('ambient-weather-api');

const converter = require('./converter');
const https = require('https');
const http = require('http');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY;
const applicationKey = process.env.APP_KEY

const apiKey2 = process.env.API_KEY2;

// const api = new WeatherAPI({
//   apiKey,
//   applicationKey,
// });

const getData = () => {
  const api = new WeatherAPI({
    apiKey,
    applicationKey,
  });

  function getName(device) {
    return device.info.name
  }

  api.connect()
  api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'))

  api.on('subscribed', data => {
    console.log(`Subscribed to ${data.devices.length} device(s):
    ${data.devices.map(getName).join(', ')}`)
  })
  api.on('data', data => {
    console.log(`${data.date} - ${getName(data.device)} current outdoor temperature is: ${data.tempf}°F`)
    console.dir(data)
  })
  api.subscribe(apiKey)
}
// const getData = () => {
//   https.get(`https://api.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`, (res) => {
//     const { statusCode } = res;
//     const contentType = res.headers['content-type'];
//
//     let error;
//     if (statusCode !== 200) {
//       error = new Error('Request Failed.\n' +
//         `Status Code: ${statusCode} : GetData`);
//       // console.dir(res)
//     }
//
//     else if (!/^application\/json/.test(contentType)) {
//       error = new Error('Invalid content-type.\n' +
//         `Expected application/json but received ${contentType}`);
//     }
//
//     if (error) {
//       console.error(error.message);
//       // Consume response data to free up memory
//       res.resume();
//       return;
//     }
//
//     res.setEncoding('utf8');
//     let rawData = '';
//     res.on('data', (chunk) => { rawData += chunk; });
//     res.on('end', () => {
//       try {
//         const testData = rawData;
//         const parsedData = JSON.parse(rawData);
//         writeData(converter(parsedData));
//         console.table(parsedData[0].lastData)
//       } catch (e) {
//         console.error(e);
//       }
//     });
//   }).on('error', (e) => {
//     console.error(`Got error: ${e.message}`);
//   });
// }



//  Grabs data from the weather station and passes it to converter module.
// const getData = () => {
//   const location = '33.87, -122.24'
//   const weatherAddress = `http://api.openweathermap.org/data/2.5/weather?${location}&units=imperial&appid=${apiKey2}`;
//   http.get(weatherAddress, (res) => {
//     const { statusCode } = res;
//     const contentType = res.headers['content-type'];
//
//     let error;
//     if (statusCode !== 200) {
//       error = new Error('Request Failed.\n' +
//         `Status Code: ${res} : getData:::`);
//       console.table(res)
//     }
//
//     else if (!/^application\/json/.test(contentType)) {
//       error = new Error('Invalid content-type.\n' +
//         `Expected application/json but received ${contentType}`);
//     }
//
//     if (error) {
//       console.error(error.message);
//       // Consume response data to free up memory
//       res.resume();
//       return;
//     }
//
//     res.setEncoding('utf8');
//     let rawData = '';
//     res.on('data', (chunk) => { rawData += chunk; });
//     res.on('end', () => {
//       try {
//         const parsedData = JSON.parse(rawData);
//         writeData(converter(parsedData));
//       } catch (e) {
//         console.error(e);
//       }
//     });
//   }).on('error', (e) => {
//     console.error(`Got error: ${e.message}`);
//   });
// };

module.exports = getData;
