/*eslint no-console: ['error', { allow: ['info', 'error'] }] */
'use strict';
const router = require('express').Router();
const api = require('./api');

api.configure(router);

//  Routes
router.get(['/', '/:num'], (req, res) => {
  let getRange = 1;

  // if (req.params.num) {
  //   getRange = req.params.num;
  // }
  res.render('pages/index', { getRange: getRange });
});

// router.get('/:num', (req, res) => {
//   let getRange = 1;
//   console.log('numbers...', getRange);
//   if (req.params.num) {
//     getRange = req.params.num;
//   }
//   res.render('pages/index', { getRange });
// });

router.get('/about', (req, res) => {
  res.render('pages/about');
});

module.exports = router;
