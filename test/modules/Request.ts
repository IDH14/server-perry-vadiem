import assert = require('assert');
import os = require('os');

import Request from '../../src/modules/Request';

describe('Request', () => {
  describe('parseRequest()', () => {

    it('should parse a simple request', () => {
      // arrange
      const mockRequest = `~METHOD~ ~VERSION~`
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequest);

      // assert
      assert.equal(request.method, '~METHOD~');
      assert.equal(request.version, '~VERSION~');
      assert.deepEqual(request.body, {});
    });

    it('should parse a request with a single-line JSON body', () => {
      // arrange
      const mockRequest = `~METHOD~ ~VERSION~${os.EOL}{ "filename": "file1.txt" }`
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequest);

      // assert
      assert.equal(request.method, '~METHOD~');
      assert.equal(request.version, '~VERSION~');
      assert.deepEqual(request.body, { "filename": "file1.txt" });
    });

    it('should parse a request with a multi-line JSON body', () => {
      // arrange
      const mockRequest = `~METHOD~ ~VERSION~${os.EOL}{${os.EOL}"filename": "file1.txt"${os.EOL}}`
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequest);

      // assert
      assert.equal(request.method, '~METHOD~');
      assert.equal(request.version, '~VERSION~');
      assert.deepEqual(request.body, { "filename": "file1.txt" });
    });

  });
});
