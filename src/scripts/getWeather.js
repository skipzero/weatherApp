(() => {
  const getWeather = (resp) => {
    return http.get(getPath,  (resp) => {
      resp.setEncoding('utf8');

      resp.on('data', (data) => {
        console.log('data', data);
        body += data;
      });

      resp.on('error', (error) => {
        console.log('ERR', error);
      })

      resp.on('end', () => {
        let parsed = JSON.parse(body);

        cb({
          pdata: parsed
        })
      })
    })
  };
  module.exports = getWeather;
})();
