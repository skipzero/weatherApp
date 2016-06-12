  //  Sample data from weather station
  'use strict';
  const chalk = require('chalk');

  let data = [{"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 33144, "OurWeatherTime": "06/11/2016 01:09:59", "FullDataString": "22.30,47.90,21.80,101288.00,40.39,0.00,0.00,225.00,0.00,0.00,0.00,0.00,0.00,225.00,225.00,0,06/11/2016 01:09:59,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 21.80, "BarometricPressure": 101288.00, "Altitude": 40.39, "OutdoorTemperature": 22.30, "OutdoorHumidity": 47.90, "CurrentWindSpeed":  0.00, "CurrentWindGust":  0.00, "CurrentWindDirection": 225.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  0.00, "WindGustMin":  0.00, "WindGustMax":  0.00, "WindDirectionMin": 225.00, "WindDirectionMax": 225.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 32960, "OurWeatherTime": "06/11/2016 01:12:34", "FullDataString": "22.10,47.80,22.40,101273.00,39.39,6.72,9.52,135.00,0.00,0.00,6.72,0.00,9.52,135.00,225.00,0,06/11/2016 01:12:34,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 22.40, "BarometricPressure": 101273.00, "Altitude": 39.39, "OutdoorTemperature": 22.10, "OutdoorHumidity": 47.80, "CurrentWindSpeed":  6.72, "CurrentWindGust":  9.52, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  6.72, "WindGustMin":  0.00, "WindGustMax":  9.52, "WindDirectionMin": 135.00, "WindDirectionMax": 225.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 32776, "OurWeatherTime": "06/11/2016 01:13:19", "FullDataString": "22.10,47.80,22.50,101277.00,40.06,0.00,38.07,135.00,0.00,0.00,6.72,0.00,38.07,135.00,135.00,0,06/11/2016 01:13:19,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 22.50, "BarometricPressure": 101277.00, "Altitude": 40.06, "OutdoorTemperature": 22.10, "OutdoorHumidity": 47.80, "CurrentWindSpeed":  0.00, "CurrentWindGust": 38.07, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  6.72, "WindGustMin":  0.00, "WindGustMax": 38.07, "WindDirectionMin": 135.00, "WindDirectionMax": 135.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 32224, "OurWeatherTime": "06/11/2016 01:13:49", "FullDataString": "22.10,47.80,22.60,101276.00,39.98,7.20,7.90,135.00,0.00,0.00,21.60,0.00,38.07,135.00,135.00,0,06/11/2016 01:13:49,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 22.60, "BarometricPressure": 101276.00, "Altitude": 39.98, "OutdoorTemperature": 22.10, "OutdoorHumidity": 47.80, "CurrentWindSpeed":  7.20, "CurrentWindGust":  7.90, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax": 21.60, "WindGustMin":  0.00, "WindGustMax": 38.07, "WindDirectionMin": 135.00, "WindDirectionMax": 135.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 33352, "OurWeatherTime": "06/11/2016 01:30:39", "FullDataString": "21.80,48.30,23.70,101266.00,39.65,0.00,0.00,135.00,0.00,0.00,0.00,0.00,0.00,135.00,135.00,0,06/11/2016 01:30:39,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 23.70, "BarometricPressure": 101266.00, "Altitude": 39.65, "OutdoorTemperature": 21.80, "OutdoorHumidity": 48.30, "CurrentWindSpeed":  0.00, "CurrentWindGust":  0.00, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  0.00, "WindGustMin":  0.00, "WindGustMax":  0.00, "WindDirectionMin": 135.00, "WindDirectionMax": 135.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 33144, "OurWeatherTime": "06/11/2016 01:31:54", "FullDataString": "21.80,48.40,23.70,101267.00,39.81,0.00,0.00,135.00,0.00,0.00,0.00,0.00,0.00,135.00,135.00,0,06/11/2016 01:31:54,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 23.70, "BarometricPressure": 101267.00, "Altitude": 39.81, "OutdoorTemperature": 21.80, "OutdoorHumidity": 48.40, "CurrentWindSpeed":  0.00, "CurrentWindGust":  0.00, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  0.00, "WindGustMin":  0.00, "WindGustMax":  0.00, "WindDirectionMin": 135.00, "WindDirectionMax": 135.00}, "id": "1", "name": "OurWeather", "connected": true},

  {"variables": {"EnglishOrMetric": 0, "AirQualitySensor": 0, "ESP8266HeapSize": 33144, "OurWeatherTime": "06/11/2016 01:33:09", "FullDataString": "21.80,48.40,23.70,101269.00,40.40,0.00,0.00,135.00,0.00,0.00,0.00,0.00,0.00,135.00,135.00,0,06/11/2016 01:33:09,AlphaStationX-W,0,-1", "FirmwareVersion": "016", "IndoorTemperature": 23.70, "BarometricPressure": 101269.00, "Altitude": 40.40, "OutdoorTemperature": 21.80, "OutdoorHumidity": 48.40, "CurrentWindSpeed":  0.00, "CurrentWindGust":  0.00, "CurrentWindDirection": 135.00, "RainTotal":  0.00, "WindSpeedMin":  0.00, "WindSpeedMax":  0.00, "WindGustMin":  0.00, "WindGustMax":  0.00, "WindDirectionMin": 135.00, "WindDirectionMax": 135.00}, "id": "1", "name": "OurWeather", "connected": true}
];

const weatherData = data => {
  data.forEach((entry, index) => {
    entry = entry.variables;
    console.log('>>>>>', entry);
    return data.push(entry, index, '999');
  });
};
console.log( data );

module.exports = data;
