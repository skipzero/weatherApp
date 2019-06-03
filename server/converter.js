/*eslint no-console: ['error', { allow: ['info', 'error'] }] */
const converter = (data) => {
  // console.log('DATA CONVERTER', data[0].lastData)
  // newData = data[0].lastData;

  const pollDate = data.date;
  const rainDate = data.lastRain;

  const date = (data) => {
    debugger;
    if (typeof data === 'object') {
      return data;
    }
    let newDate = data;
    newDate = newDate.split('T');
    console.log('DAT::::', newDate)
    newDate[1] = newDate[1].split('.');
    newDate = [newDate[0], newDate[1][0]];
    newDate = newDate.join(' ')
    console.log('DATA!!!!!', newDate);
    return newDate;
  }
  console.log('+++++++', date(data));
  console.log('converter', data)

  const dbData = {
    tempinf: data.tempinf,
    humidityin: data.humidityin,
    baromrelin: data.baromrelin,
    baromabsin: data.baromabsin,
    tempf: data.tempf,
    humidity: data.humidity,
    winddir: data.winddir,
    windspeedmph: data.windspeedmph,
    windspdmph_avg10m: data.windspdmph_avg10m,
    windgustmph: data.windgustmph,
    maxdailygust: data.maxdailygust,
    hourlyrainin: data.hourlyrainin || 0,
    eventrainin: data.eventrainin || 0,
    dailyrainin: data.dailyrainin || 0,
    weeklyrainin: data.weeklyreainin || 0,
    monthlyrainin: data.monthlyrainin || 0,
    totalrainin: data.totalrainin || 0,
    solarradiation: data.solarradiation,
    uv: data.uv,
    feelsLike: data.feelsLike,
    dewPoint: data.dewPoint,
    date: date(pollDate),
    lastRain: date(pollDate),
    macAddress: data.macAddress, // '80:7D:3A:7C:21:3E',
  };

  const device = data.device;

  console.log('======', dbData.date);
  return dbData;
};

module.exports = converter;
