/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const router = require('express').Router();
const api = require('./api');

api.configure(router);

//  Routes
router.get(['/', '/:num'], (req, res) => {
  let getRange = 1;
  console.log('numbers...', getRange);
  if (req.params.num) {
    getRange = req.params.num;
  }
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
  res.res('pages/about');
});

module.exports = router;
