const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const pubIp = require('public-ip');

const io = require('socket.io').listen();

const pollStation = require('./src/server/pollStation');
const pool = require('./src/server/pool');

const api = require('./api');

const port = 51500;

const color = require('colors/safe');

//  :::SERVER RELATED CODE HERE:::
//  static file served from...
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

// const cleanData = (data) => {
//   console.log(`CleanData our data: ${data}`);
// };

io.sockets.on('connection', (socket) => {
  console.log(color.blue.bold('IO Connection established...'));

  // const opt = {
  //   hostname: '73.162.245.173',
  //   port: port,
  //   path: '/weather',
  //   method: 'GET',
  // }

  function ioTimer () {
    const updateLoop = setTimeout(() => {
      http.get('http://73.162.245.173/weather', (res) => {

      });
      ioTimer;
    }, 2000);
  }
  ioTimer;

  // socket.on('event', (data) => {
  //   console.log(color.magenta.bold(`Our Socketio Data: ${data}`));
  // });

  socket.on('disconnect', (data) => {
    console.log(color.red.bold(`IO user disconnected... ${data}`));
    clearTimeout(updateLoop);
  });
});


pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

pollStation();
