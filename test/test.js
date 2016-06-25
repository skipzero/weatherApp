const mocha = require('gulp-mocha');
const expect = require('expect.js');

describe('sanity tests... True', function () {
  it('should eq true', function () {
    expect(true).to.be(true)
  })
})
