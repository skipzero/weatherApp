/*eslint no-console: ['error', { allow: ['info', 'error'] }] */

'use strict';

const convert = (data) => {
  let dataCon = JSON.parse(data) || [];
  dataCon = dataCon.FullDataString.split(',');

  const compare = (a, b) => {
    if (a.length > b.length) {
      return -1;
    }
    if (a.length < b.length) {
      return 1;
    }
    return 0;
  };

  //  convert our date string to be year first.
  // IN: 12/16/2016 02:02:00   =>  2016-12-16 02:03:45:OUT
  const dateFormatter = (stationDate) => {
    let date = stationDate;
    date = date.split(' ');
    date[0] = date[0].split('/').sort(compare);
    date[0] = date[0].join('-');
    date = date.join(' ');
    return date;
  };

  //  The values in the FullDataString are all in metric.
  const weatherData = {
    id: 0,
    created: dateFormatter(dataCon[16]),
    outTemp: dataCon[0],
    outHum: dataCon[1],
    inTemp: dataCon[2],
    barom: dataCon[3],
    alt: dataCon[4],
    curWindS: dataCon[5],
    curWindG: dataCon[6],
    curWindD: dataCon[7],
    rainTot: dataCon[8],
    windSpeedMin: dataCon[9],
    windSpeedMax: dataCon[10],
    windGustMin: dataCon[11],
    WindGustMax: dataCon[12],
    windDirMin: dataCon[13],
    windDirMax: dataCon[14],
    engMetric: dataCon[15],
    station: dataCon[17],
    airQualSens: dataCon[18],
    airQualQual: dataCon[19],
  };
  // weatherData.engMetric = 1;
  const imperialTemp = n => {
    return (n * 1.8 + 32).toFixed(2);
  };

  const inchesMercury = n => {
    return ((n / 1000.0) * 0.29529980165).toFixed(2);
  };
    //  if we switch our measurements to imperial over metric.
  if (weatherData.engMetric === 1) {
    weatherData.outTemp = imperialTemp(weatherData.outTemp);
    weatherData.inTemp = imperialTemp(weatherData.inTemp);
    weatherData.barom = inchesMercury(weatherData.barom);
  }
  return weatherData;
};

module.exports = convert;
