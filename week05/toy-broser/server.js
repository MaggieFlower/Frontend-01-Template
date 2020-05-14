var http = require('http')
let body = `<html><body><div style="color: red; width: 40px;height: 40px;">我是中国人</div></body></html>`
const server = http.createServer((req, res) => {
  console.log('require receive')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.setHeader('Transfer-Encoding', 'chunked');
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end(body);
});
server.listen(8088)