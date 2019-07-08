/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
const WeatherAPI = require('ambient-weather-api');

const converter = require('./converter');
const writeData = require('./writeData');

const getData = (apiKey, appKey) => {
  let data;

  const api = new WeatherAPI({
    apiKey: apiKey,
    applicationKey: appKey,
  });

  function getName(device) {
    return device.info.name
  }

  api.connect();
  api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'));

  api.on('subscribed', data => {
    console.log(`Subscribed to ${data.devices.length} device(s):
    ${data.devices.map(getName).join(', ')}`)
  });

  api.on('data', data => {
    const convertedData = converter(data);
    writeData(convertedData);
  });

  api.subscribe(apiKey);
}
module.exports = getData;
