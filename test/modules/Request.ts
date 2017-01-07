var assert = require('assert');
const os = require('os');
import Request from '../../src/modules/Request';

const mockRequests = {
	LIST:  `LIST idh14sync/1.0`,
	GET: `GET idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`,
	GET2: `GET idh14sync/1.0${os.EOL}{${os.EOL}"filename": "file1.txt"${os.EOL}}`,
	PUT: `PUT idh14sync/1.0${os.EOL}{ "filename": "file1.txt", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" }`,
	DELETE: `DELETE idh14sync/1.0${os.EOL}{ "filename": "file1.txt" }`,


};

describe('Request', () => {
  describe('parseRequest()', () => {

    it('should parse a LIST request', () => {
      // arrange
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequests.LIST);

      // assert
      assert.equal(request.method, 'LIST');
      assert.equal(request.version, 'idh14sync/1.0');
      assert.deepEqual(request.body, {});
    });

    it('should parse a GET request', () => {
      // arrange
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequests.GET);

      // assert
      assert.equal(request.method, 'GET');
      assert.equal(request.version, 'idh14sync/1.0');
      assert.deepEqual(request.body, { "filename": "file1.txt" });
    });

    it('should parse a GET request with newlines in JSON', () => {
      // arrange
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequests.GET2);

      // assert
      assert.equal(request.method, 'GET');
      assert.equal(request.version, 'idh14sync/1.0');
      assert.deepEqual(request.body, { "filename": "file1.txt" });
    });

    it('should parse a PUT request', () => {
      // arrange
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequests.PUT);

      // assert
      assert.equal(request.method, 'PUT');
	    assert.equal(request.version, 'idh14sync/1.0');
	    assert.deepEqual(request.body, { "filename": "file1.txt", "checksum": "8578201cf22b83bdaef44e1c5a5dc2e764218aa8", "original_checksum": "", "content": "" });
    });

    it('should parse a DELETE request', () => {
      // arrange
      const request: Request = new Request();

      // act
      request.parseRequest(mockRequests.DELETE);

      // assert
      assert.equal(request.method, 'DELETE');
      assert.equal(request.version, 'idh14sync/1.0');
      assert.deepEqual(request.body, { "filename": "file1.txt" });
    });
  });
});
