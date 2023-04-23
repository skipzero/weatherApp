#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
// import express from 'express';
// import cors from 'cors';
const cors = require('cors')
require('dotenv').config();
const express = require('express');

// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';

// console.log('DOT ENV', process.env)

const app = express();

let corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(express.json());
app.disable('x-powered-by')

app.use(express.urlencoded({ extended: true }));

app.get('/weather', (req, res) => {
  console.log('hello get', req)
});
app.post('/weather', (req, res) => {
  console.log('hello post', req)
});
app.put('/weather', (req, res) => {
  console.log('hello put', req)
});

// app.get('/', (req, res) => {
//   res.json({ message: 'welcome to app III' });
// });

// require('./app/routes/routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
