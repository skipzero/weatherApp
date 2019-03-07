/*eslint no-console: ['error', { allow: ['info', 'error'] }] */
'use strict';
const router = require('express').Router();
const api = require('./api');

api.configure(router);

//  Routes
router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;
