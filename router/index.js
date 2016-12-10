/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
'use strict';
const router = require('express').Router();

//  Routs
router.get('/', (req, res) => {
  res.render(`../views/index.ejs`);
});

router.get('/about', (req, res) => {
  res.res(`../views/about.ejs`);
});

module.exports = router;
