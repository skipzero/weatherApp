const converter = require('../src/server/converter');

test('converter is a really weird animal...', () => {
  expect(1).toEqual(1);
  console.log('REPORT', converter().dateFormatter())
});
