/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
const WeatherAPI = require('ambient-weather-api');

const converter = require('./converter');
const writeData = require('./writeData');
const apiKey = process.env.API_KEY;
const applicationKey = process.env.APP_KEY;

const getData = () => {
  const api = new WeatherAPI({
    apiKey: apiKey,
    applicationKey: process.env.APP_KEY,
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
    writeData(converter(data));
  })
  api.subscribe(apiKey)
}
module.exports = getData;
