import path = require('path');
import fs = require('fs');

import { toBase64, checksum } from './../Helpers';
import { config } from './../../config';

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';

export default class ListReponse extends Response implements ResponseInterface {

    create() {
        try {
            const response = {
                'status': 200,
                'files': []
            };
            const files = fs.readdirSync(config.filesDir);

            files.forEach(function (fileName) {
                const filePath = path.join(config.filesDir, fileName);
                const file = fs.readFileSync(filePath, 'utf-8');

                response.files.push({
                    filename: toBase64(fileName),
                    checksum: checksum(file),
                });

            }, this);

            this.object = response;
        } catch (error) {
            this.object = { 'status': 500 };
        }
    }
}