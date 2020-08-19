const http = require('http');
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