/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const http = require('http');
const port = 3000;

const writeData = (data) => {
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
      console.info(`Status: ${res.statusCode}`);
      console.info(`Body ${chunk}`);
    });
    res.on('end', () => {
      return;
    });
  });

  post.on('error', (err) => {
    console.error(`ERROR: ${err.message}`);
    throw err;
  });

  post.write(postData);
  post.end();
};
module.exports = writeData;
