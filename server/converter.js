/*eslint no-console: ['error', { allow: ['info', 'error'] }] */

let windSpeedArray = [];
let rainTot = [];
const converter = (data) => {
  const rain = data.rain;
  const main = data.main;
  const wind = data.wind;
  const {
    temp,
    pressure,
    humidity,
    temp_min,
    temp_max,
  } = main;

  const {
    speed,
    deg,
  } = wind;

  let rainTemp;
  let currRain;

  if (rain) {
    const rainKey = Object.keys(rain);
    if (rainTot[rainTot.length - 1] !== rain[rainKey] && rainTot.length <= 20) {
      rainTot.push(rain[rainKey]);
    } else {
      rainTot.shift();
      rainTot.push(rain[rainKey]);
    }
    rainTemp = rainTot.sort((a, b) => a - b);
    currRain = rainTemp[rainTemp.length - 1]
    console.info('RAIN', rainTot, rainTemp)
  } else {
    currRain = 0;
  }

  const created = () => {
    let newDate = data.dt * 1000;
    newDate = new Date(newDate);
    newDate = JSON.stringify(newDate)
    const newDateArray = newDate.split('T');
    newDateArray[1] = newDateArray[1].split('.')[0]
    newDate = newDateArray.join(',').slice(1);
    newDate = `${newDate.slice(0, 10)} ${newDate.slice(11)}`;
    return newDate;
  };

  if (windSpeedArray.length >= 12) {
    windSpeedArray.shift();
  }

  windSpeedArray.push(speed);

  const minMaxArray = windSpeedArray.slice(0);

  minMaxArray.sort((a, b) => a - b);

  console.log('Wind Array::', windSpeedArray, minMaxArray)

  const weatherData = {
    id: 0,
    created: created(),
    outTemp: temp,
    outHum: humidity,
    inTemp: temp_min,
    barom: pressure,
    alt: 40,
    curWindS: speed || 0,
    curWindG: speed || 0,
    curWindD: deg || 0,
    rainTot: currRain,
    windSpeedMin: minMaxArray[minMaxArray.length - 1],
    windSpeedMax: minMaxArray[0],
    windGustMin: speed || 0,
    windGustMax: speed || 0,
    windDirMin: deg || 0,
    windDirMax: deg || 0,
    engMetric: 1,
    station: 'WeatherAlpha-138',
    airQualSens: 0,
    airQualQual: 0,
  };

  return weatherData;
};

module.exports = converter;
