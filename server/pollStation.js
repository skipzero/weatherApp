/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */


// const myIp = require('./myIp');
import getData from './getData';

//  Set minutes for polling weather station...
const minutes = 5;

// const pollStation = (ip) => {
//   const delay = minutes * 60000;  //  Convert our milliseconds to minutes...
//   getData(ip);
//   setTimeout(() => {
//     pollStation(ip);
//   }, delay);
// };

export default pollStation;
