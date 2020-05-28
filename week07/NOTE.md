### render
  感悟:
  
    原来那些css属性全都是在底层一个一个计算出来的, 以前觉得好神奇的东西, 自己写了一遍toy浏览器之后, 茅塞顿开的感觉.很爽!
    照着老师的思路, 自己写了一个渲染的js:
    ```
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
    ```
    我没有判断父容器的flex-wrap, 直接用的wrap, 没有做其他情况处理, 然后是对子元素的宽度做统计,超出了就另起一行;其次是对交叉轴方向居中的空白的计算,计算好了后应用到元素的style.主要是计算元素的左边,上边到容器的距离

    复习了一下李兵老师的小册子结合toy浏览器:
    
    当渲染进程拿到html文档, 解析成DOM树(css解析并生成标准的styleSheets, 应用到DOM树)
    ---> 对应我们写的request类, computeCSS给dom添加样式
    由DOM树解析成DOM布局树, 这个过程会去除head标签以及他的子元素, 还有那些display:none的元素,进而对dom树节点进行位置计算 ---> 对应我们的layout部分
    然后是对dom布局树进行分层(拥有层叠上下文的元素)->绘制->合成
    ---> 对应我们的render部分, 当然render仅仅是进行了合成图片的过程

    影响节点产生层叠上下文的元素:
    ```
      Root element of the document (<html>).
      Element with a position value **absolute** or **relative** and **z-index value other than auto**.
      Element with a position value **fixed** or **sticky** (sticky for all mobile browsers, but not older desktop).
      Element that is a child of a flex (flexbox) container, with z-index value other than auto.
      Element that is a child of a grid (grid) container, with z-index value other than auto.
      Element with a opacity value less than 1 (See the specification for opacity).
      Element with a mix-blend-mode value other than normal.
      Element with any of the following properties with value other than none:
        transform
        filter
        perspective
        clip-path
        mask / mask-image / mask-border
      Element with a isolation value isolate.
      Element with a **-webkit-overflow-scrolling** value touch.
      Element with a will-change value specifying any property that would create a stacking context on non-initial value (see this post).
      Element with a contain value of layout, or paint, or a composite value that includes either of them (i.e. contain: strict, contain: content).
    ```