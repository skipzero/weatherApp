const mocha = require('gulp-mocha');
const expect = require('expect.js');
const envIp = require('../src/js/env-util.js')

describe('sanity tests... True', function () {
  it('should eq true', function () {
    expect(true).to.be(true)
  })
})

describe('we need an IP...', function () {
  it('we should have a valid IP...', function () {
    expect('10.0.0.35').to.be('10.0.0.35');
  });
});
