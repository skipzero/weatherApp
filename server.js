const express = require('express');
const app = express();

const debug = require('debug')('http');
const server = require('http').createServer(app);

const bodyParser = require('body-parser');

const io = require('socket.io').listen(server);

const pollStation = require('./src/server/pollStation');
const pool = require('./src/server/pool');

const api = require('./api');

const name = 'my-weatherApp';
const port = 51500;

const color = require('colors/safe');

let users = [];
let connections = [];

console.log(`OurApp ${name}`);
debug('Starting %s', name);

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

io.sockets.on('connection', (socket) => {
  connections.push(socket);

  console.log(color.blue.bold('IO Connection established...'));

  socket.on('event', (data) => {
    console.log(color.yellow.bold(`Our Socketio Data: ${data}`));
  });

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('IO user disconnected...');
  });
});


pool.init();
api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

pollStation();
