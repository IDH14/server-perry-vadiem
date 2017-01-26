import net = require('net')
import path = require('path')
import fs = require('fs')
import os = require('os')
import yargs = require('yargs')

import { config } from './config';
import Request from './modules/Request';
import ResponseFactory from './modules/Response/ResponseFactory';
import ResponseInterface from './modules/Response/ResponseInterface';

const argv = yargs.argv;

// set port we need to listen to
config.port = argv.port || config.defaultPort;

// set files folder
config.filesDir = argv.dir || config.defaultFilesDir;

var server = net.createServer((socket) => {
  socket.setEncoding('utf8');

  // when receiveing data from the socket
  socket.on('data', (input: string) => {
    console.log ('data log')

    var request: Request = new Request();
    request.parseRequest(input);

    var response: ResponseInterface = ResponseFactory.createFromRequest(request);

    response.create();

    console.log(`---- RESPONSE BEGIN ----${os.EOL}${response.toString()}${os.EOL}--RESPONSE END`);
    socket.write(response.toString());
  });

  // runs after data has been transmitted
  socket.on('end', () => {
    console.log('we zijn klaar');
  });
  socket.on('error', (err: Error) => {
    console.log(err);
  });
});

/**
 * runs when server.closed() gets called
 */
server.on('close', () => {
  console.log('closed server');
});

/**
 * Handle errors
 */
server.on('error', (err) => {
  throw err;
});

/**
 * listen to specified port
 */
server.listen(config.port, () => {
  console.log('opened server on', server.address());
});
