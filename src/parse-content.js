'use strict';


    function getValue(content, offset, length) {
        return parseInt(content.slice(offset, length).toString('hex'), 16);
    }


module.exports = function parseContent(content) {


    const avlRecords = [];
    const codecId = content.readUInt8(0);
    const recordsCount = content.readUInt8(1);
    content = content.slice(2);
    for (let idx = 0; idx < recordsCount; idx++) {
        const timeStamp = new Date(getValue(content, 0, 8));
        content = content.slice(8);
        const priority = getValue(content, 0, 1);
        content = content.slice(1);
        const longitude = getValue(content, 0, 4);
        content = content.slice(4);
        const latitude = getValue(content, 0, 4);
        content = content.slice(4);
        const altitude = getValue(content, 0, 2);
        content = content.slice(2);
        const angle = getValue(content, 0, 2);
        content = content.slice(2);
        const satellites = getValue(content, 0, 1);
        content = content.slice(1);
        const speed = getValue(content, 0, 2);
        content = content.slice(2);
        const ioElementId = getValue(content, 0, 1);
        content = content.slice(1);
        const ioElementsCount = getValue(content, 0, 1);
        content = content.slice(1);
        const ioOneByteCount = getValue(content, 0, 1);
        content = content.slice(1);

        const ioOneByteRecords = {};
        const ioTwoByteRecords = {};
        const ioFourByteRecords = {};
        const ioEightByteRecords = {};

        for (let ioIdx = 0; ioIdx < ioOneByteCount; ioIdx++) {
            const ioId = getValue(content, 0, 1);
            content = content.slice(1);
            const ioValue = getValue(content, 0, 1);
            content = content.slice(1);
            ioOneByteRecords[ioId] = ioValue;
        }

        const ioTwoByteCount = getValue(content, 0, 1);
        content = content.slice(1);

        for (let ioIdx = 0; ioIdx < ioTwoByteCount; ioIdx++) {
            const ioId = getValue(content, 0, 1);
            content = content.slice(1);
            const ioValue = getValue(content, 0, 2);
            content = content.slice(2);
            ioTwoByteRecords[ioId] = ioValue;
        }

        const ioFourByteCount = getValue(content, 0, 1);
        content = content.slice(1);

        for (let ioIdx = 0; ioIdx < ioFourByteCount; ioIdx++) {
            const ioId = getValue(content, 0, 1);
            content = content.slice(1);
            const ioValue = getValue(content, 0, 4);
            content = content.slice(4);
            ioFourByteRecords[ioId] = ioValue;
        }

        const ioEightByteCount = getValue(content, 0, 1);
        content = content.slice(1);

        for (let ioIdx = 0; ioIdx < ioEightByteCount; ioIdx++) {
            const ioId = getValue(content, 0, 1);
            content = content.slice(1);
            const ioValue = getValue(content, 0, 8);
            content = content.slice(8);
            ioEightByteRecords[ioId] = ioValue;
        }

        avlRecords.push({
            codecId,
            timeStamp,
            priority,
            longitude,
            latitude,
            altitude,
            angle,
            satellites,
            speed,
            ioElementId,
            ioOneByteRecords,
            ioTwoByteRecords,
            ioFourByteRecords,
            ioEightByteRecords
        });
    }


    console.log(content);

    return avlRecords;
};