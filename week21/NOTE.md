## 第一周
  1.在上课之前, 一直认为标签本来就是这样的,  拿来就用, 不知道还有原理性的东西, 不知道还有规范, 标签也是一种类, 感觉打开了新世界的大门!

  2.通过这次总结css, 把nth-child, nth-last-child搞清楚了, 这两个伪类选择器都不强制需要父元素, 如果没有父元素, 默认找离自己最近的父元素; 这两个伪类选择器会匹配所有的兄弟元素, 不管是不是相同标签; nth-child是正序找元素, mth-last-child是逆序找元素;

    nth-of-type, nth-last-of-type跟nth-child, nth-last-child的区别是, 这两个伪类选择器会匹配相同标签的所有兄弟元素

  3.通过查看ECMAscript的规范, 明白了像作用域、函数上下文这样的概念， 都是通过函数创建的

  4.最大的收获就是英文文档， 能慢速看下去了！
## 第二周
  1 码点是对字符的编码规则, unicode支持大部分语言, 实现unicede编码规范的是utf8
  2 将码点转换为utf8的规则是:
    ```
        0 - 127            0XXXXXXX                                     0 <= m <= 127
        128 - 2047         110X XXXX 10XX XXXX                          128 <= m <= 2047
        2048 - 65535       1110 XXXX 10XX XXXX 10XX XXXX                2048 <= m <= 65535
        65536 - 2097151    1111 0XXX 10XX XXXX 10XX XXXX 10XX XXXX      65536 <= m <= 2097151
    ```
  3 typedArray是内存视图, 是计算机中一片连续的内存区域, typedArray采用的是小端字节序
    - typedArray指的是:
        Int8Array(); 
        Uint8Array(); 
        Uint8ClampedArray();
        Int16Array(); 
        Uint16Array();
        Int32Array(); 
        Uint32Array(); 
        Float32Array(); 
        Float64Array();
    - 使用ArrayBuffer构造函数可以生成一片连续的内存空间, 但是不能进行操作
    - 使用typedArray构造函数对内存进行操作
    例子: 
      ```
        定义一个拥有8个字节的内存空间
        var x = new ArrayBuffer(8)  
        var y = new Int8Array(x)
        给内存中的数组下标为0 2 7的元素赋值
        Int8Array(8) [1, 0, 4, 0, 0, 0, 0, 4]
        拷贝y到m
        var m = new Int16Array(y)
        Int16Array(8) [1, 0, 4, 0, 0, 0, 0, 4]
        创建一个新的类型化视图数组, 如果buffer里面已经有值, 按照小端字序的规则存储
        *** 分析: 16位的整数由2个字节组成, buffer是8个字节的内存, 所以16位整数需要4个字节来存储
        *** 0000000100000000 0000010000000000 0000000000000000  0000000000000100
        var m = new Int16Array(x)
        Int16Array(4) [1, 4, 0, 1024]
      ```
    4 负数以其补码的形式存储在计算机中
    5 nbsp 是在换行的时候, 不会分割左右两边元素; 平时都只用来搞空格了哈哈哈哈  肤浅
## 第三周
  1 第5节课讲的是表达式,以及表达式的优先级; 第6节课讲的是语句
  2 位运算符, 直接对二进制进行计算, 但是我觉得位运算还需要补补, 不知道位运算的应用在哪里
  3  valueOf, toString, Symbol.toPrimitive 对象转换字符串的
  ```
    let a = {toString(){}, valueOf(){}, [Symbol.toPrimitive]()}

    a+'' → a做类型转换的时候, 会调用Symbol.toPrimitive函数, 如果转换成功则返回值, 否则报错

    let b = {toString(){}, valueOf(){}}

    b+'' → b做类型转换的时候,会优先调用valueOf函数, 如果转换的值符合结果, 则返回, 否则调用toString()方法
  ```
  4 为什么基础类型也会有像对象那样调用的方法?
    比如, let a = 'some text'; a.split(''); 这个split是后台帮我们做了下面这些操作后, 才有的:
      var a1 = new String('some text')
      var a2 = a1.split('')
      a1=null
    也就是说, 我们直接使用构造函数创建字符串, 就不会经过上述的暗箱操作部分了
  5 对象: 状态的变化称为行为, 写类的时候, 方法的名称应该的状态的变化; 比如狗'咬'人, 行为是人受伤了, 人的状态改变
## 第四周
  ### javascript结构化

    Reaml(无特殊说明)包含: lexicalEnvironment, variableEnvironment, 这两种也统称为lexicalEncironment;
      lexicalEnvironment:
        Environment Records:
          declarative Environment Records( varible, constant, let, class, module, import, and/or funtion declarations)
          Function Environment Records
          module Environment Records
          object Environment Records
          global Environment Record
    在使用语法糖创建对象,数组的时候需要用到reaml

  ### 浏览器解析语法语义
    在解析服务器返回的数据时, 结尾的/r/n不知道在判断的时候如何去掉, 暂时采取的办法是在读取的时候将/r以后的字符截取掉
## 第五周
  ### 解析css, 形成DOM渲染树
      第一步  AddCSSRule: 收集css规则; 使用css库将所有的css规则解析成AST
      第二步  computedCSs: 将AST应用到每个元素(在生成element的时候调用, 不能在pop元素的时候才收集, 因为有些元素的样式是会依赖父元素的)
      第三步  将DOM树顺序反转成子孙排列
      第四步  循环规则并匹配元素; 元素索引i和样式索引j同时增加
      第五步  将匹配到的元素根据优先级应用到元素上; 优先级采用[id, class, type, inline]的时候来表示
## 第六周
    复习了一下李兵老师的小册子结合toy浏览器:
    
    当渲染进程拿到html文档, 解析成DOM树(css解析并生成标准的styleSheets, 应用到DOM树)
    ---> 对应我们写的request类, computeCSS给dom添加样式
    由DOM树解析成DOM布局树, 这个过程会去除head标签以及他的子元素, 还有那些display:none的元素,进而对dom树节点进行位置计算 ---> 对应我们的layout部分
    然后是对dom布局树进行分层(拥有层叠上下文的元素)->绘制->合成
    ---> 对应我们的render部分, 当然render仅仅是进行了合成图片的过程
## 第七周
  ### 块级元素
块级元素可以是我们常用的`div标签 p标签`等, 也可以是display为`block, list-item, table`值的元素,每个块级元素都会生成一个块级盒(block-level box), 块级盒有块级格式化上下文.

### 块容器
`In CSS 2.1, many box positions and sizes are calculated with respect to the edges of a rectangular box called a containing block.`css2.1的规范说明块容器是一个矩形框, 是它包含的很多盒子的位置以及尺寸计算的参照物.`display`的值为`inline-block, table-cell, and table-caption`是块容器

### 块盒
`Block-level boxes that are also block containers are called block boxes.`块盒是既是块级盒子, 又是块容器的盒子.

### 正常流
正常流中的盒子要么属于块级格式化上下文, 要么属于内联级格式化上下文
#### 块级格式化上下文(BFC)
`Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.In a block formatting context, boxes are laid out one after the other, vertically, beginning at the top of a containing block. The vertical distance between two sibling boxes is determined by the 'margin' properties. Vertical margins between adjacent block-level boxes in a block formatting context collapse.`
float元素, 绝对定位元素,块容器(不一定是块盒),块盒的overflow的值不等于visible的都会新建一个块级格式化上下文,在同一个块级格式化上下文中的相邻的两个块级元素会发生垂直方向的margin重叠, 除非这个盒子新建了一个块级格式化上下文.
来个例子
```
<div style="background-color: cornflowerblue">
  <div style="width: 100px; height: 100px;background-color: darkorange; margin: 30px;">1</div>
  <div style="background-color: rgb(255, 238, 0);margin: 30px">
    <div style="width: 100px; height: 100px;background-color: rgb(43, 255, 0);margin: 30px;">2</div>
    <div style="width: 100px; height: 100px;background-color: rgb(43, 255, 0);margin: 30px;">3</div>
    <div style="width: 100px; height: 100px;background-color: rgb(43, 255, 0);margin: 30px;">4</div>
  </div>
  <div style="width: 100px; height: 100px;background-color: rgb(0, 102, 255);margin: 30px;">5</div>
</div>
```

可以看到, 编号2的盒子跟它的父元素发生了垂直方向margin重叠, 2号盒子的父元素跟1号盒子又发生了垂直方向margin的重叠, 因为他们都隶属于同一个BFC
![](https://user-gold-cdn.xitu.io/2020/6/3/1727816cbce1b488?w=380&h=685&f=png&s=7208)

我们在2号盒子的父元素加上overflow: hidden, 让它拥有自己的BFC, 此时2号元素跟父元素拥有了边距, 没有跟父元素发生垂直方向的margin重叠, 而父元素跟1号元素还是属于同一个BFC, 因此跟1号元素发生了边距重叠

![](https://user-gold-cdn.xitu.io/2020/6/3/172781b67f1faeaa?w=376&h=748&f=png&s=7417)

#### 内联级格式化上下文
`In an inline formatting context, boxes are laid out horizontally, one after the other, beginning at the top of a containing block. Horizontal margins, borders, and padding are respected between these boxes. The boxes may be aligned vertically in different ways: their bottoms or tops may be aligned, or the baselines of text within them may be aligned. The rectangular area that contains the boxes that form a line is called a line box.`
内联级格式化上下文主要是行内元素的对齐方式比较难, 如下
```
<div style="font-size:50px;line-height:100px;background-color:pink;">
  <div style="vertical-align: bottom;display:inline-block;width:1px;height:1px;">
      <div style="width:1000px;;height:1px;background:red;"></div>
  </div>
  <span>Hello </span>
  <div style="line-height:70px;height:150px;background-color:aqua;display:inline-block">hello</div>
  <div style="vertical-align:top;line-height:100px;height:100px;background-color:aqua;display:inline-block">hello</div>
  <div style="vertical-align:bottom;line-height:550px;height:550px;background-color:plum;display:inline-block">hello</div>
</div>
```


![](https://user-gold-cdn.xitu.io/2020/6/3/17278302d6f35374?w=626&h=550&f=png&s=13187)
底部红色的线是最外层div的基线, 含有hello1文本的盒子以其文本的baseline对齐父元素的文本的baseline, hello2元素以其文本的top线对准父元素的top线, hello3以其文本的bottom对齐父元素的bottom(即使该元素的line-height<550, 它的对齐方式仍然是边框底部对齐父元素的文本的bottom, 因为它的高度把父元素撑开了, 如果按照文本的bottom去对齐父元素的bottom, 那么永远无法对齐)
## 第八周
  ### event
    补充一下事件那里 : addEventListner的第三个参数, 表示事件是否在捕获阶段触发; 可算参数option中capture的优先级高于addEventListner的第三个参数
## 第九周
  ### Range
  range.selectNodeContent 将指针移动到节点的内容开始处
  r.extractContents()  截取选中的节点内容

  选取精确到文本节点的某个字
  range.setEnd
  range.setStart

  ### cssAPI
  ```
  document.stylesheets

  document.styleSheets[0].cssRules[0].style.width = ''  可以通过这种方式, 修改伪元素的大小

  document.styleSheets[0].insertRule('div {width: 100px}', 0) 添加样式

  document.styleSheets[0].deleteRule(document.styleSheets[0].rules[0])
  document.styleSheets[0].removeRule(position) 移除样式

  document.styleSheets[0].deleteRule

  window.getComputedStyle(el, pseudoEl) // 只读
  ```
  ###窗口相关

    window.open

  ###滚动相关

    window.scroll/window.scrollBy/window.scrollTo/window.scrollX/window.scrollY/window.scrollHeight

  ###获取盒子: 内联级盒子可能会产生多个行盒

    getClientRect

  ###获取元素的准确位置

    getBoundingClientRect

## 第十周
  ### 寻路算法
  小技巧: 把上一次的坐标存储到当前坐标点对应的数组中
  使用单个数组存放所有的坐标, x,y跟坐标点的关系是position = y*100 + x

  ### RegExp正则
  exec()执行字符串匹配查询, 返回结果是数组, 或者null
  如果RegExp对象有g或者y(sticky), 那么这个对象是有状态的, 他们会存储上一个匹配的字符串的最后一个字符的索引, lastIndex;可以一直调用exec()方法,来达到迭代的效果
## 第十一周
  ### 算法
  算法 = 套路
  想着挑战一下wildcard的问号,然后刚开始百度, 就出来一个新名词: 动态规划.然后又去看了下动态规划, 总结这玩意儿就是: 
  先找一个数组, 这个数组是干什么的; 
  数组的初始值;
  一般是左边, 上边的元素跟当前元素存在什么关系
  我觉得最难的就是: 这个数组是干什么的; 然后是找元素存在的关系; 只能多多练习了!
## 第十二周
  ### 创建Range
  为每个文本节点创建range的时候, 每个文本节点都要执行createRange(), 就跟添加十个节点一样, 不能创建一个节点, 添加10次

  ### 代理
  代理这块感觉有点微妙, 如这个数据{a: {c: 10}, b: {c:20}}, get获取的时候, 如果是对象, 会递归一层, 也就是我获取obj.a和获取obj.b的时候, 递归的参数都是{c:10}了,此时这个对象属于哪个key由外层的上下文决定

  ### 拖动
  move执行的太快, 如果移动的间隔不大, 没有超过一个字的宽度, 那么drag会跳跳跳, 我用了setTimeout降低移动的速度

  ### 组件
  基本组成: state, attribute, prop, config
  其中, config只能js设置,state只能用户设置 
## 第十三周
  ### 轮播图
  手动轮播要理解 offset是啥意思, 没搞懂这个, 在这纠结了好久, 看起来挺常用的一个东西, 自己写起来感觉好麻烦!

  ### 组件
  跟着老师学下来, 感觉组件不再那么神秘了! 组件都是用js在去写代码!
## 第十四周
  ### SFC

  写单页面的时候, 按照JSX的思路, 把文档的树结构变成createElement的函数, 使用递归处理树结构, 忘记视频里面老师怎么存文本节点的, 我用的是一个data去存的数据, 如果是文本节点,就直接存进去, 非文本节点, 递归调用函数, 最后返回的时候, 就是createElement(节点名称, 节点属性, 子元素(文本节点)), (index.html可以直接运行 , 对比carousel.view)

  ### carousel
  把carousel加上animation库, 现在既可以手动滑动, 停止手动滑动之后, 也可以自动轮播, 爽歪歪(index.html可以直接运行)~

  在鼠标滑动的时侯, 要把之前的动画给清掉, 结束鼠标滑动事件的时候, 把自动轮播事件重新启用
## 第十五周
  ### 组件
  不用css去实现动画的原因之一是: css的动画用matrix做的, 而matrix加了skew参数之后, transform, scale等属性是不可逆的; css动画在用户操作暂停等高级操作的时候,代码上没有js易操作

  自定义事件使用new CustomEvent('eventName', detail: {}), 其中, detail里面是参数, 自定义的事件触发用dispatch方法.

## 第十六周
  ### 组件

  carousel组件改成内容样式的, 更符合我们的使用习惯, 更直观; 我觉得我的createElement写的不好...每次写组件都会给组件定制一个createElement, 可能写的少了, 没啥经验, 互拼乱凑倒是把功能做出来了, 继续看着elementui写写组件.

  ### console

  跟着老师, 写了一下node的console, 没接触这个之前, 我以为那一个个选项设置一下就好了...没想到光标的移动也需要我们自己写...刷新了认知; 目前还有bug; 我的光标上下移动的时候, 会往右闪一下, 因为默认向下的时候, 光标是会往右边偏移一格的, 这个时候, 我手动让他往左移, 然后就会出现光标往右移,又往左移的闪动; 写完之后看老师的代码, 比我多了一个while循环, 但是这个while循环应该不会影响吧....


  ----------------------

  呵 , 原来是vscode的bug

## 第十七周-第二十一周
  工具链


回顾了一下这21周的课, 我自己的难点主要在toy-browser这一方面, 然后就是算法编程那块, 组件那块我觉得不是很难, 需要多多练习. 20多周的课就结束了! 舍不得...结课后, 多多复习吧, 争取出去面试的时候, offer多多!! 最后感谢老师, 感谢班班, 感谢助教的付出,感谢极客时间这个平台!出了这么好的课! 让我这五个多月拥有肉眼可见的成长!