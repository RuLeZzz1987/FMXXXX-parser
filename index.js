'use strict';

const server = require('./src/server');

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});