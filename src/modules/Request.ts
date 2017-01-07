import os = require('os');

export default class Request {

	version: string;
	method: string;
	body: JSON;

	constructor() {}

	parseRequest(data: string) {

		const lines = this.splitOnEol(data);

		const meta = lines.shift();
		const metaParts = this.splitOnSpace(meta);
		this.method = metaParts[0];
		this.version = metaParts[1];

		const joinedLines = lines.join('');

		this.body = this.parseJson(joinedLines || '{}');
	}

	/**
	 * Split a given string on EOL characters
	 * Returns an array with strings
	 */
	private splitOnEol(string: string): string[] {
		return string.split(os.EOL);
	}

	/**
	 * Splits a given string on space characters
	 * Returns an array with strings
	 */
	private splitOnSpace(string: string): string[] {
		return string.split(' ');
	}

	private parseJson(data: string) {
		return JSON.parse(data);
	}
}