/*eslint no-console: ['error', { allow: ['info', 'error'] }] */
const converter = (data) => {
  console.log('DATA CONVERTER', data[0].lastData)
  newData = data[0].lastData;

  const {
    winddir,
    windspeedmph,
    windgustmph,
    maxdailygust,
    windgustdir,
    windspdmph_avg2m,
    winddir_avg2m,
    windspdmph_avg10m,
    winddir_avg10m,
    humidity,
    humidityin,
    tempf,
    tempinf,
    battout,
    batt_25,
    hourlyrainin,
    dailyrainin,
    hourrainin,
    weeklyrainin,
    monthlyrainin,
    yearlyrainin,
    eventrainin,
    totalrainin,
    baromrelin,
    baromabsin,
    uv,
    solarradiation,
    co2,
    pm25,
    pm25_24h,
    tz,
    dateutc,
    ServerCalculatedFields,
    lastRain,
    dewPoint,
    feelsLike,
    date,
  } = newData;

  console.log('======', newData)

};

module.exports = converter;
