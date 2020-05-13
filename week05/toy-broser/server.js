var http = require('http')
const server = http.createServer((req, res) => {
  console.log('require receive')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok, im coming!');
});
server.listen(8088)