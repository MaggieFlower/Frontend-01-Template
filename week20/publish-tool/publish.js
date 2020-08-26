const http = require('http');
const https = require('https')
const { exec } = require('child_process');
let filename = "./package"
let archiver = require('archiver');

let redirect_uri = encodeURIComponent("http://localhost:8081/auth")
exec(`cmd /c start https://github.com/login/oauth/authorize/?client_id=Iv1.11f8f5df00e6594d&redirect_uri=${redirect_uri}&scope=read%3Auser&state=abc123456`)


const server = http.createServer((req, res) => {
  if (req.url.match(/^\/publish/)) {
    let token = req.url.match(/token=([^&]+)/)
    const  options = {
      host: 'localhost',
      port: 8081,
      path: '/file?filename=package.zip',
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
        "Authorization": `token ${token[1]}`
      }
    };
    let archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    const requst = http.request(options, (response) => {
    });
    requst.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    archive.directory(filename, false);
    archive.pipe(requst);
    archive.on('end', () => {
      requst.end()
    });
    archive.finalize();
    res.end('client publish success!')
  }
});

server.listen(8080)


