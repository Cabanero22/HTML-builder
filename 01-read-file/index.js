const fs = require('fs');
const path = require('path');
const placeFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(placeFile);
stream.on('data', (chunk) => console.log(chunk.toString()));
