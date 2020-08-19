let http = require('http');
let archiver = require('archiver');
let filename = "./package"

const  options = {
  host: 'localhost',
  port: 8081,
  path: '/?filename=package.zip',
  method: "POST",
  headers: {
    'Content-Type': 'application/octet-stream'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

let archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

archive.directory(filename, false);
archive.pipe(req);
archive.on('end', () => {
  req.end();
});
archive.finalize();


