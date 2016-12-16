const expect = require('expect.js');
const converter = require('../server/converter');

describe('start with a function', () => {
  it('make sure we\'re given a function', () => {
    expect(converter).to.be.a('function');
  })
});
