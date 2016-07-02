(() => {
  const convert = data => {
    data = JSON.parse(data);
    data = data.FullDataString.split(',');



    const dateFormatter = stationDate => {
      let date = stationDate;
      date = date.split(' ');
      date[0] = date[0].split('/').sort(compare);
      date[0] = date[0].join('-');
      date = date.join(' ');

      return date;
    }

    const compare = (a, b) => {
      if (a.length > b.length) {
        return -1;
      }
      if (a.length < b.length) {
        return 1;
      }
      return 0;
    };

    //  The values in the FullDataString are all in metric.
    let weatherData = {
      outTemp: data[0],
      outHum: data[1],
      inTemp: data[2],
      barom: data[3],
      alt: data[4],
      curWindS: data[5],
      curWindG: data[6],
      curWindD: data[7],
      rainTot: data[8],
      windSpeedMin: data[9],
      windSpeedMax: data[10],
      windGustMin: data[11],
      WindGustMax: data[12],
      windDirMin: data[13],
      windDirMax: data[14],
      engMetric: data[15],
      curDateTime: dateFormatter(data[16]),
      station: data[17],
      CurAirQualSens: data[18],
      CurAirQualQual: data[19],
    };

    console.log('Convert', weatherData);
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = convert;
  } else {
    window.convert = convert;
  }
})();
