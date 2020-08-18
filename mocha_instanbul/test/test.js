var assert = require('assert');
const { test } = require('../src');

describe('test', function () {
  it('could not divide zero', function () {
    const msg = test(0, 0);
    assert.equal(msg, 'divider could not be zero');
  });
});
