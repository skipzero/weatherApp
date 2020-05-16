/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const router = require('express').Router();
const api = require('./api');

api.configure(router);

//  Routes
router.get('/', (_req, res) => {
  res.render('pages/index');
});

router.get('/about', (_req, res) => {
  res.render('pages/about');
});

router.get('nivo', (_req, res) => {
  res.render('pages/nivo');
});

router.get('/zoom', (_req, res) => {
  res.render('pages/zoom');
});

module.exports = router;
