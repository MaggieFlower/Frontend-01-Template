const https = require('https');
const http = require('http')
const unzipper = require('unzipper')

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/auth/)) {
    return auth(req, res)
  }
  
  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return
  }
  if (req.url.match(/^\/file/)) {
    console.log(req.url)

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/user`,
      method: 'GET',
      headers: {
        "Authorization": `${req.headers.authorization}`,
        "User-Agent": "toy-tool"
      }
    };
    const request = https.request(options, (response) => {
      response.on('data', (d) => {
        let result =d.toString().match(/\"id\":([\d]+)/)
        if (result && result[1] == '30599615') {
          let pipestream = unzipper.Extract({ path: './server/public' })
          req.pipe(pipestream)
          req.on('end', () => {
            pipestream.end()
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('server publish success!!');
          })
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('user not match');
        }
      });
    });
  
    
    request.on('error', (e) => {
      console.error( e);
    });
    request.end();
  }

});

function auth (req, res) {
  let code = req.url.match(/code=([^&]+)/)[1]
  let client_id = "Iv1.11f8f5df00e6594d"
  let redirect_uri = encodeURIComponent("http://localhost:8081/auth")
  let state	= "abc123456"
  let client_secret = "f17f1f9475c99688fda46bcbaffb4ddf4b6e9a15"
  let params = `client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&state=${state}`
  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  };
  
  const request = https.request(options, (response) => {
  
    response.on('data', (d) => {
      let result = d.toString().match(/access_token=([^&]+)/)
      if(result) {
        res.writeHead(200, { 'Content-Type': 'text/html', "access_token":result[1]});
        res.end(`<div><a href="http://localhost:8080/publish?token=${result[1]}">publish</a></div>`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h3>request authorization</h3>');
      }
    });
  });
  
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}
server.listen(8081);