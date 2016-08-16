const http = require('http');

const weatherData = (data, port) => {
  const postData = JSON.stringify(data);
  const options = {
    path: '/weather',
    method: 'POST',
    port: port,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
  }

  let post = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('error', err => {
      console.error(`ERROR: ${err}`);
    });

    res.on('data', (chunk) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      console.log(`Body ${chunk}`);
    });
    res.on('end', () => {
      console.log('writing done!');
    });
  });

  post.on('error', (e) => {
    console.log(`ERROR!! ${e.message}`);
  });

  post.write(postData);
  post.end();
};

module.exports = weatherData;
