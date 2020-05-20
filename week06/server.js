/*


*/
var http = require('http')
let body =
`<html maaa=a >
<head>
  <style>
    body div #myid{
      width:100px;
      background-color: #ff5000;
    }
    body div img{
      width:30px;
      background-color: #ff1111;
    }
    body .mydiv.mydiv2{
      width: 100px;
      height: 200px;
      background: pink
    }
    body .mydiv{
      width: 200px;
    }
    body div .img{
      height: 100px;
    }
    body div.el#el[pg=100]{
      width: 100px;
      height: 100px;
      backgroundColor: blue
    }
  </style>
</head>
<body>
    <div class="el" id="el" pg="100"></div>
    <div style="width: 100px;height: 100px;background-color: red" >
        <img id="myid" class="myid"/>
        <img class="img"/>
    </div>
    <div class="mydiv mydiv2"></div>
</body>
</html>`
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