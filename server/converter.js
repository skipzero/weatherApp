/*eslint no-console: ['error', { allow: ['info', 'error'] }] */


const convert = (data) => {
  let dataCon = data; //JSON.parse(data);
  // dataCon = dataCon.FullDataString.split(',');

  const created = () => {
    let workDate = new Date();
    workDate = workDate.toISOString();
    let workArray = workDate.split('.');
    console.log(workDate);
    return workArray[0];
  };
  //  convert our date string to be year first.
  // IN: 12/16/2016 02:02:00   =>  OUT: 2016-12-16 02:03:45
  // const dateFormatter = (stationDate) => {
  //   let date = new Date();
  //   console.log(date)
  //   date = date.toISOString().substring(0, 19).split('T').join(' ');
  //   return date;
  // };
  const dataKeys = Object.keys(dataCon);

  const weatherData = {
    id: 0,
    created: created(),
    outTemp: dataCon[dataKeys[7]],
    outHum: dataCon[dataKeys[10]],
    inTemp: dataCon[dataKeys[8]],
    barom: 0,
    alt: 40,
    curWindS: dataCon[dataKeys[12]],
    curWindG: dataCon[dataKeys[13]],
    curWindD: dataCon[dataKeys[14]],
    rainTot: 444,
    windSpeedMin: dataCon[dataKeys[12]],
    windSpeedMax: dataCon[dataKeys[12]],
    windGustMin: dataCon[dataKeys[13]],
    windGustMax: dataCon[dataKeys[13]],
    windDirMin: dataCon[dataKeys[14]],
    windDirMax: dataCon[dataKeys[14]],
    engMetric: 1,
    station: 'WeatherAlpha-138',
    airQualSens: dataCon[dataKeys[18]],
    airQualQual: dataCon[dataKeys[15]],

  };

  //  The values in the FullDataString are all in metric.
  // const weatherData = {
  //   id: 0,
  //   outTemp: dataCon[0],
  //   outHum: dataCon[1],
  //   inTemp: dataCon[2],
  //   barom: dataCon[3],
  //   alt: dataCon[4],
  //   curWindS: dataCon[5],
  //   curWindG: dataCon[6],
  //   curWindD: dataCon[7],
  //   rainTot: dataCon[8],
  //   windSpeedMin: dataCon[9],
  //   windSpeedMax: dataCon[10],
  //   windGustMin: dataCon[11],
  //   WindGustMax: dataCon[12],
  //   windDirMin: dataCon[13],
  //   windDirMax: dataCon[14],
  //   engMetric: dataCon[15],
  //   created: dateFormatter(dataCon[16]),
  //   station: dataCon[17],
  //   airQualSens: dataCon[18],
  //   airQualQual: dataCon[19],
  // };
  return weatherData;
};

module.exports = convert;
