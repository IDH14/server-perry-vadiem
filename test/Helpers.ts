import assert = require('assert');
import os = require('os');

import { splitOnEol, splitOnSpace, fromBase64, toBase64, checksum } from '../src/modules/Helpers';

describe('Helpers', () => {

	describe('splitOnEol()', () => {
		it('should split a string on newline', () => {
			const actual = `new${os.EOL}line`;
			const expected = ['new', 'line'];

			assert.deepStrictEqual(splitOnEol(actual), expected);
		});
	});

	describe('splitOnSpace()', () => {
		it('should split a string on newline', () => {
			const actual = `new line`;
			const expected = ['new', 'line'];

			assert.deepStrictEqual(splitOnSpace(actual), expected);
		});
	});

	describe('toBase64() and fromBase64()', () => {
		it('should encode a string as base64', () => {
			const actual = 'file1.txt';
			const expected = 'ZmlsZTEudHh0';

			assert.deepStrictEqual(toBase64(actual), expected);
		});

		it('should decode a string from base64', () => {
			const actual = 'ZmlsZTEudHh0';
			const expected = 'file1.txt';

			assert.deepStrictEqual(fromBase64(actual), expected);
		});
	});

});