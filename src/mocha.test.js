var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
      expect([1,2,3].indexOf(4)).toBe(-1);
      assert.equal(true, false);
    });
  });
});


var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error);
//   console.log('statusCode:', response.statusCode);
//   console.log('body:', body.length);
// });

describe('Asynch testing', function() {

  describe('http request callback', function() {
    // it('should GET without error', function(done) {
    //   request.get('http://www.google.com', function(err, response, body) {
    //     if (err) done(err);
    //     else done();
    //   });
    // });

    // it('should GET with error', function(done) {
    //   request.get('http://www.google.com', function(err, response, body) {
    //     expect(err).not.toBe(null);
    //     done(err);
    //   });
    // });
  });

});