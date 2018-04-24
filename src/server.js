'use strict';

const net = require('net');
const parse = require('./parse');

const server = net.createServer(socket => {
    socket.on('error', e => {
        console.log(e);
        socket.close();
    });
    socket.on('readable', parse);
});

module.exports = server;