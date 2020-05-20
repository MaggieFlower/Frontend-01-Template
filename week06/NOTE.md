### html解析
解析的时候, 需要处理一下结尾的\r\n, 在结束一个chunk的数据之后, 多添加一个状态, 用来判断是否在\r\n后面是0 , 如果是, 就结束数据读取
```
    if (this.current === this.WAITTING_0_LINE_END) {
      // 如果是0 , 代表结束
      if (char == '0') {
        this.current = null
      } else {
        this.current = this.WAITTING_LENGTH
      }
    }
    if (this.current === this.WAITTING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0){
          this.isFinished = true
        }
        this.current = this.WAITTING_LENGTH_LINE_END
      }
    } else if (this.current === this.WAITTING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_CHUNKED
      }
      // 读body的正文部分
    }else if (this.current === this.READING_CHUNKED) {
      // 判断 length不等于0 的时候 ， 才push， 否则不push， 去除结尾的\r\n
        this.content.push(char)
        this.length --
      if (this.length === 0) {
        this.current = this.WAITTING_NEW_LINE
      } 
    } else  if (this.current === this.WAITTING_NEW_LINE) {
      if (char === '\n') {
        this.current = this.WAITTING_0_LINE_END
      }
    }
```
由于body的首字符是16进制, 所以我们在取body的长度的时候, 可以this.chunkLength * 16 + Number(`0x${char}`);
也可以在server端把字符的content-length传给客户端, 让客户端直接接收.

### 解析css, 形成DOM渲染树
    第一步  AddCSSRule: 收集css规则; 使用css库将所有的css规则解析成AST
    第二步  computedCSs: 将AST应用到每个元素(在生成element的时候调用, 不能在pop元素的时候才收集, 因为有些元素的样式是会依赖父元素的)
    第三步  将DOM树顺序反转成子孙排列
    第四步  循环规则并匹配元素; 元素索引i和样式索引j同时增加
    第五步  将匹配到的元素根据优先级应用到元素上; 优先级采用[id, class, type, inline]的时候来表示
