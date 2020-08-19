let add = require('../src/add').add
let assert = require('assert')
it('add function should be ', function () {
  assert.equal(add(5, 6), 11)
});