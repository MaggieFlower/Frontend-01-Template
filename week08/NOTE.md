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