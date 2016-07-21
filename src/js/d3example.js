(() => {
  'use strict';
  let data = `[{"id":116,"created":"2016-07-20T05:08:38.000Z","outTemp":47.6,
                "outHum":86,
                "inTemp":17.8,
                "barom":101657,
                "alt":39.99,
                "curWindS":0,
                "curWindG":0,
                "curWindD":112.5,
                "rainTot":0,
                "windSpeedMin":0,
                "windSpeedMax":0,
                "windGustMin":0,
                "windGustMax":0,
                "windDirMin":90,
                "windDirMax":180,
                "engMetric":0,
                "station":"AlphaStationX-W",
                "airQualSens":0,
                "airQualQual":-1},
              {"id":115,"created":"2016-07-20T05:04:28.000Z","outTemp":47.7,
              "outHum":85.6,"inTemp":18,"barom":101663,"alt":39.91,"curWindS":0,
              "curWindG":0,"curWindD":135,"rainTot":0,"windSpeedMin":0,
              "windSpeedMax":0.96,"windGustMin":0,"windGustMax":1.12,
              "windDirMin":135,"windDirMax":135,"engMetric":0,"station":"AlphaStationX-W",
              "airQualSens":0,"airQualQual":-1}]`;
  data = JSON.parse(data);
  data = data.map((curr, i) => {
    console.log('Map', curr, i);
    return curr.outTemp;
  });
  console.log('d3', data);
})();
