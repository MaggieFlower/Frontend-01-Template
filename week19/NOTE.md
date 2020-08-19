# 发布系统
### 上传一个单独的jpg文件
server端
```
  const http = require('http');
  const fs = require('fs')

  const server = http.createServer((req, res) => {
    let match = req.url.match(/filename=([\s\S]+)/)
    let filename = match && match[1]
    if (!filename) return
    let pipestream = fs.createWriteStream(`./server/public/${filename}`)
    req.pipe(pipestream)
    req.on('end', () => {
      pipestream.end()
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    })
  });
  server.listen(8081);

```

client端
```
const http = require('http');
const fs = require('fs')
let filename = "./1.jpg"

fs.stat(filename, (err, stats) => {
  const  options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=1.jpg',
    method: "POST",
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stats.size
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  let stream = fs.createReadStream( filename)
  stream.pipe(req)
  // 文件读取完成
  stream.on('end', () => {
    req.end('ok')
  })
});
```
### 上传zip包
客户端上传一个zip包, server端解压, server端
```const http = require('http');
const unzipper = require('unzipper')
const server = http.createServer((req, res) => {
  let pipestream = unzipper.Extract({ path: './server/public' })
  req.pipe(pipestream)
  req.on('end', () => {
    pipestream.end()
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  })
});
server.listen(8081);
```

客户端上传一个zip包, client端

```
const http = require('http');
var archiver = require('archiver');
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

var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

archive.directory(filename, false);
archive.pipe(req);
archive.on('end', () => {
  req.end();
});
archive.finalize();

```
