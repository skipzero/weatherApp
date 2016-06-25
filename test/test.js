const mocha = require('gulp-mocha');
const expect = require('expect.js');
const envIp = require('../src/scripts/envUtil')

describe('sanity tests... True', function () {
  it('should eq true', function () {
    expect(true).to.be(true)
  })
})

describe('we need an IP...', function () {
  it('we should have a valid IP...', function () {
    console.log(envIp())
  });
});
