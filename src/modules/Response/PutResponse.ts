import path = require('path');
import fs = require('fs');

import { checksum, fromBase64 } from './../Helpers';
import { config } from './../../config';

import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';

export default class PutResponse extends Response implements ResponseInterface {

    create() {

        const filename = this.request.body['filename'];
        const content = this.request.body['content'];
        const originalChecksum = this.request.body['original_checksum'];


        /** CREATE FILE IF NOT EXISTS */
        if(!this.fileExists(filename)) {

            this.saveFile(filename, fromBase64(content));

            this.object = {
                status: 200,
                message: 'File created'
            }

            return;
        }

        /** GET EXISTING FILE */
        const existingFile = this.getFile(filename);
        const existinFileSha1 = checksum(existingFile);
        console.log(existinFileSha1);

        if(existinFileSha1 !== originalChecksum) {
            this.object = {
                status: 412,
                message: 'Checksums do not match'
            }
            return;
        }

        /** OVERWRITE OLD FILE */
        this.saveFile(filename, fromBase64(content));

        this.object = {
            status: 200,
            message: 'File updated'
        };

        return;
    }

    fileExists(fileName): boolean {
        return fs.existsSync(this.getFilePath(fileName));
    }

    getFile(fileName) {
        const filePath = this.getFilePath(fileName);

        return fs.readFileSync(filePath, { encoding: 'utf8' });
    }

    saveFile(fileName, contents) {
        const filePath = this.getFilePath(fileName);

        fs.writeFileSync(filePath, contents, 'utf8');
    }

    private getFilePath(filename): string {
        return path.join(config.filesDir, filename);
    }

}