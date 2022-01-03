// Srteams is a more efficient way to use

const fs = require('fs');

const rs = fs.createReadStream(
  './files/lorem.txt',
  {encoding: 'utf-8'}
);

const ws = fs.createWriteStream('./files/new-lorem.txt');

// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// })

// More efficient 
rs.pipe(ws);

