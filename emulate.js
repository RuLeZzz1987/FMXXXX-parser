'use strict';

const net = require('net');
const {Buffer} = require('buffer');

const socket = new net.Socket();

socket.on('connect', async (...args) => {
    console.log(`connected ${JSON.stringify(args)}`);
    try {
        authorize();

        console.log('authorized');

        console.log('sent 1st part');
    } catch (e) {
        socket.close();
        throw e;
    }
});

socket.on('readable', () => {
    const response = socket.read(2);
    console.log(response);

    sendHeaders();

    sendContent();
});

socket.connect(9000, '127.0.0.1');

function authorize() {
    const IMEI = Buffer.from('000F313233343536373839303132333435', 'hex');
    socket.write(IMEI);
}

function sendHeaders() {
    const chunk = Buffer.from('00000000000000A7', 'hex');
    socket.write(chunk);
}

function sendContent() {
    const chunk = Buffer.from('080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004', 'hex');
    socket.write(chunk);
}