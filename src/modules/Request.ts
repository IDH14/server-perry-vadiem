import os = require('os');
import { splitOnEol, splitOnSpace } from './Helpers';

const log = console.log;

export default class Request {

	version: string;
	method: string;
	body: JSON;

	constructor() {}

	parseRequest(data: string) {

		console.log(data);

		const lines = splitOnEol(data);

		const meta = lines.shift();

		const metaParts = splitOnSpace(meta);

		this.method = metaParts[0];
		this.version = metaParts[1];

		const joinedLines = lines.join('');

		this.body = this.parseJson(joinedLines || '{}');
	}

	/**
	 * Transform given string to JSON
	 */
	private parseJson(data: string) {
		return JSON.parse(data);
	}
}