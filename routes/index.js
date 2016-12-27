/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
'use strict';
const router = require('express').Router();

//  Routs
router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/about', (req, res) => {
  res.res('pages/about');
});

module.exports = router;
