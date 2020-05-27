/*


*/
var http = require('http')
// layoutMyself.js
let flexBody2 =
`
<html>
<head>
  <style>
  .wrapper{
    display: flex;
    background-color: rgb(131,129,129);
    width: 500px;
    height: 500px;
    flex-wrap: wrap;
  }
  .div1{
    width: 100px;
    background-color: rgb(255,192,203);
  }
  .div2{
    width: 200px;
    background-color: rgb(255,165,0);
    height: 200px;
    align-self: center
  }
  .div3{
    width: 100px;
    height: 100px;
    align-self:flex-end;
    background-color: rgb(0,128,0)
  }
  .div4{
    width: 300px;
    height: 150px;
    background-color: rgb(28,78,128);
    align-self: center;
  }
  .div5{
    width: 100px;
    height: 150px;
    background-color: rgb(0,78,0);
    align-self: center;
  }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
    <div class="div5"></div>
  </div>
</body>
</html>
`
// layout.js
let flexBody = 
`
<html>
<head>
  <style>
  .wrapper{
    display: flex;
    background-color: rgb(255,255,255);
    width: 500px;
    height: 500px;
  }
  .div1{
    flex: 1;
    background-color: rgb(255,192,203);
    height: 250px
  }
  .div2{
    flex: 1;
    background-color: rgb(0,128,0)
  }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="div1"></div>
    <div class="div2"></div>
  </div>
</body>
</html>
`
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
  res.setHeader('Content-Length', Buffer.byteLength(flexBody));
  // res.setHeader('Content-Length', Buffer.byteLength(flexBody2));
  res.setHeader('Transfer-Encoding', 'chunked');
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // res.end(flexBody2);
  res.end(flexBody);
});
server.listen(8088)