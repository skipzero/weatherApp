const http = require('http');
const port = 51500;

const weatherData = (data) => {
  console.log('weatherData...');
  const postData = JSON.stringify(data);
  const options = {
    path: '/weather',
    method: 'POST',
    port,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const post = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('error', err => {
      console.error(`ERROR: ${err}`);
      throw err;
    });

    res.on('data', (chunk) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      console.log(`Body ${chunk}`);
    });

    res.on('end', () => {
      console.log('success!');
    });
  });

  post.on('error', (err) => {
    console.log(`ERROR!! ${err.message}`);
    throw err;
  });

  post.write(postData);
  post.end();
};

module.exports = weatherData;
