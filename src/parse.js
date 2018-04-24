'use strict';

const IMEIs = require('./IMEIs');
const Sockets = require('./sockets');
const parseContent = require('./parse-content');

module.exports = function parse() {
    const socket = Sockets.get(this);

    if (socket) {
        if (!socket.waitForContent) {
            let contentLength = this.read(8);
            contentLength = contentLength.slice(4).readUInt32BE();

            const content = this.read(contentLength);

            if (!content) {
                socket.waitForContent = true;
                socket.contentLength = contentLength;
                return;
            }

            parseContent(content);
        }

        if (socket.contentLength < 1) {
            throw new Error(`Invalid content length: ${socket.contentLength}`);
        }

        const content = this.read(socket.contentLength);

        if (!content) {
            return;
        }

        parseContent(content);
    } else {
        let IMEI = this.read(17);
        IMEI = IMEI.toString().slice(2);

        if (!IMEIs.has(IMEI)) {
            throw new Error('Unknown device');
        }

        Sockets.set(this, {IMEI, self: this, waitForContent: false});

        this.write(Buffer.from('01', 'hex'));
    }
};

// '00000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b00'
// '080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004'
// '00000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d00'

// '0f14f650209cca80006f00d6040004'