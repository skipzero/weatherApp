const converter = require('../src/server/converter');
const data = 'FullDataString':'46.80,91.90,14.90,100833.00,39.98,7.68,6.46,135.00,0.14,6.72,12.48,5.53,10.25,135.00,202.50,0,09/03/2016 20:53:31,AlphaStationX-W,0,-1';
console.log('REPORT', converter(data));

test('converter is a really weird animal...', () => {
  expect(1).toEqual(1);
});
