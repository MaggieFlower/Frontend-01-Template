## Range
range.selectNodeContent 将指针移动到节点的内容开始处
r.extractContents()  截取选中的节点内容

选取精确到文本节点的某个字
range.setEnd
range.setStart

## cssAPI
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