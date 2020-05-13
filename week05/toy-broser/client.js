const net = require('net')


class Request{
  // method, host, port, path
  // body: k=v
  // content-type: text/xml; application/json; application/x-www-form-urlencode
  // headers
  constructor (options) {
    this.method = options.method || "GET"
    this.host = options.host
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}
    this.path = options.path
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = 'application/x-www-form-urlencode'
    }
    if (this.headers["Content-Type"] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === 'application/x-www-form-urlencode' ){
      this.bodyText = Object.keys(this.body).map(key =>`${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers["Content-Length"] = this.bodyText.length

  }
  toString(){
    let keys = Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')
    return `
${this.method} ${this.path} HTTP/1.1\r
${keys}\r\n
${this.bodyText}\r`
  }
  send (connect) {
    return new Promise((res, rej) => {
      const parser = new ResponseParser
      if (connect) {
        connect.write(this.toString())
      } else {
        connect = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connect.write(this.toString())
        })
      }
      connect.on('data', (data) => {
        parser.reveive(data.toString())
        if (parser.isFinished) {
          res(parser.response)
        }
        // console.log('parser.statusline: ',parser.bodyText)
        // res(data.toString())
        connect.end()
      })
      connect.on('error', (err) => {
        rej(err)
      })
    })
  }
}


/*
let  re = new Request({
  method: 'POST',
  host: '127.0.0.1',
  port: "8088",
  path: '/',
  body: {
    name: 'winter'
  },
  headers: {
    ['x-Foo2']: 'bar'
  }
})

re.send()
 const client = net.createConnection({ host: '127.0.0.1', port: 8088 }, () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write(re.toString());
  client.write('Host: 127.0.0.1\r\n');
  client.write('Content-Type: application/x-www-form-urlencode\r\n');
  client.write('Content-Length: 10\r\n');
  client.write('\r\n');
  client.write('HostOhYeah\r\n');
  client.write('\r\n');
}); */
class Response {

}

class ResponseParser {
  constructor () {
    this.WAITTING_STATUS_LINE = 0
    this.WAITTING_STATUS_LINE_END = 1 //处理 \r\n 的
    this.WAITTING_HEADER_NAME = 2 // 处理header的开始部分
    this.WAITTING_HEADER_SPACE = 3 // 处理header的值部分
    this.WAITTING_HEADER_VALUE = 4 // 处理header的值部分
    this.WAITTING_HEADER_LINE_END = 5 // 处理一行header的结束
    this.WAITTING_HEADER_BLOCK_END = 6 // （header后的空行）处理header的结束
    this.WAITTING_BODY = 7

    this.current = this.WAITTING_STATUS_LINE
    this.statusline = ""
    this.headers = {}
    this.headerName = ""
    this.headerValue = ""
    this.bodyParser = null;
  }
  get isFinished () {
    return this.bodyParser && this.bodyParser.content
  }
  get response () {
    this.statusline.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/ )
    // 在这里处理一下接收到的数据
    this.bodyParser.content.length = this.bodyParser.content.indexOf('\r')
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  reveive (string) {
    for (let i=0; i<string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }
  receiveChar (char) {
    if (this.current === this.WAITTING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITTING_STATUS_LINE_END
      } else if (char === '\n') {
        this.current = this.WAITTING_HEADER_NAME
      }else {
        this.statusline += char
      }
    } 
    if (this.current === this.WAITTING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITTING_HEADER_NAME
      }
    } else if (this.current === this.WAITTING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITTING_HEADER_SPACE
      } else if(char === '\r') {
        this.current = this.WAITTING_HEADER_BLOCK_END
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser()
        }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITTING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITTING_HEADER_VALUE
      }
    } else if (this.current === this.WAITTING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITTING_HEADER_LINE_END
        // headers有多个，当遇到\r时， 把header存起来，然后改变状态， 继续存下一个header
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      }else {
        this.headerValue += char
      }
    } else  if (this.current === this.WAITTING_HEADER_LINE_END) {  // 反复读header
      if (char === '\n') {
        this.current = this.WAITTING_HEADER_NAME
      }
    }  else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
      
      if (char === '\n') {
        this.current = this.WAITTING_BODY
      }
    }else  if (this.current === this.WAITTING_BODY) { 
      this.bodyParser.receiveChar(char)
    }
  }
}

class TrunkedBodyParser {
  constructor () {
    this.WAITTING_LENGTH = 0
    this.WAITTING_LENGTH_LINE_END = 1
    this.READING_CHUNKED = 2
    this.WAITTING_NEW_LINE = 3
    this.WAITTING_NEW_LINE_END = 4
    this.isFinished = false
    this.length = 0
    this.content = []
    this.current = this.WAITTING_LENGTH
  }
  receiveChar (char) {
    if (this.current === this.WAITTING_LENGTH) {
      if (char === '\r') {
        console.log('this.WAITTING_LENGTH\r')
        if (this.length === 0){
          this.isFinished = true
        }
        this.current = this.WAITTING_LENGTH_LINE_END
      } else{
        console.log('this.WAITTING_LENGTH: length计算')
        this.length *= 10
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
      }
    } else if (this.current === this.WAITTING_LENGTH_LINE_END) {
      console.log('this.WAITTING_LENGTH_LINE_END')
      if (char === '\n') {
        this.current = this.READING_CHUNKED
      }
    }else if (this.current === this.READING_CHUNKED) {
      console.log('this.READING_CHUNKED')
      // 判断 length不等于0 的时候 ， 才push， 否则不push， 去除结尾的\r\n
        this.content.push(char)
        this.length --
      if (this.length === 0) {
        this.current = this.WAITTING_NEW_LINE
      } 
    } else  if (this.current === this.WAITTING_NEW_LINE) {
      if (char === '\n') {
        this.current = this.WAITTING_LENGTH
      }
    }
  }
}

// 异步立即执行函数
void async function () {
  let  re = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: "8088",
    path: '/',
    body: {
      name: 'winter'
    }
  })
  let respon = await re.send()
  console.log(respon)
}()