function getStyle (element){
  if (!element.style){
    element.style = {}
  }
  for(let prop in element.computedStyle) {
    var p = element.computedStyle.value
    // 将属性都存到style里面
    element.style[prop] = element.computedStyle[prop].value
    // 将属性值换算成数字, 后面直接参与计算
    if (element.style[prop].toString().match(/px$/)){
      element.style[prop] = parseInt(element.style[prop])
    }

    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

function layout (element) {
  if (JSON.stringify(element.computedStyle) === '{}') return
  elementStyle = getStyle(element)
  // toy-browser只渲染display为flex的元素
  if (elementStyle.display != 'flex') return
  // 子元素集合
  var items = element.children.filter(e => e.type === 'element')
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0)
  })

  // 父元素的样式
  var style = elementStyle
  Array('width', 'height').forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })
  // 父元素样式初始化
  if (!style.flexDirection || style.flexDirection === 'auto')
    style.flexDirection = 'row'
  if (!style.alignItems || style.alignItems === 'auto')
    style.alignItems = 'stretch'
  if (!style.justifyContent || style.justifyContent === 'auto')
    style.justifyContent = 'flex-start'
  if (!style.flexWrap || style.flexWrap === 'auto')
    style.flexWrap = 'nowrap'
  if (!style.alignContent || style.alignContent === 'auto')
    style.alignContent = 'stretch'
  // 定义宽高 起始位置  结束位置  轴方向 基线位置
  var mainSize, mainStart, mainEnd, mainSign, mainBase,
  crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1
    mainBase = 0

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = style.width

    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (style.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = style.height

    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (style.flexDirection === 'wrap-reverse') {
    [crossStart, crossEnd] = [crossEnd, crossStart]
    crossSign = -1
  } else {
    crossSign = 1
    crossBase = 0
  }
  var isAutoMainSize = false
  // 如果父元素没有mainSize(宽,高), 那么他的mainSize主要由各个子元素的size加起来
  if (!style[mainSize]){
    elementStyle[mainSize] = 0
    for(var i = 0; i<items.length; i++) {
      var item= items[i]
      if (item.style[mainSize] !== null || item.style[mainSize] != (void 0))
        elementStyle[mainSize] = elementStyle[mainSize] + item.style[mainSize]
    }
    isAutoMainSize = true
  }

  // 将元素存进flex行
  var flexLine = []
  var flexLines = [flexLine]
  // 主轴剩余空间
  var mainSpace = elementStyle[mainSize]
  // 交叉轴剩余空间
  var crossSpace = 0
  for (var i =0; i<items.length; i++) {
    var item = items[i]
    var itemStyle = getStyle(item)
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }
    // 子元素有flex属性
    if(itemStyle.flex) {
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] != (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item)
    } else {
      // 元素的宽度大父元素的宽度
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }
      // 主轴剩余宽度小于子元素宽度
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace
        flexLine.crossSpace = crossSpace
        flexLine = [item]
        flexLines.push(flexLine)

        mainSpace = style[mainSize]
        crossSpace = 0
      } else {
        flexLine.push(item)
      }
      if (itemStyle[crossSize] != null &&itemStyle[crossSize] != (void 0)){
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize]
    }
  }
  // 主轴坐标的剩余宽度
  flexLine.mainSpace = mainSpace

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    // 交叉轴的高度等于父元素的高度
    flexLine.crossSpace = (style[crossSize] != undefined) ?style[crossSize]: crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  if (mainSpace < 0) {
    // var scale = stye[mainSize]/ (style[mainSize] - mainSpace)
    var currenMain = mainBase
    for (var i = 0; i<items.length; i++) {
      var item = items[i]
      itemStyle = getStyle(item)
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0
      }
      // itemStyle[mainSize] = itemStyle[mainSize] * scale
      itemStyle[mainSize] = itemStyle[mainSize]
      itemStyle[mainStart] = currenMain
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
      currenMain = itemStyle[mainEnd]
    }
  } else {
    flexLines.forEach((items) => {
      var mainSpace = items.mainSpace
      var flexTotal = 0
      for (var i=0;i<items.length;i++) {
        var item = items[i]
        var itemStyle = getStyle(item)
        if ((itemStyle.flex != null) && (itemStyle.flex != undefined)) {
          flexTotal += itemStyle.flex
        }
      }
      if (flexTotal > 0) {
        var currenMain = mainBase
        for (var i = 0;i<items.length; i++) {
          var item = items[i]
          var itemStyle = getStyle(item)
          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal)
          }
          itemStyle[mainStart] = currenMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currenMain = itemStyle[mainEnd]
        }
      } else {
        if (style.justifyContent === 'flex-start') {
          var currentMain = mainBase
          var step = 0
        } 
        if (style.justifyContent === 'flex-end') {
          var currenMain = mainSpace * mainSign + mainBase
          var step = 0
        }
        if (style.justifyContent === 'center'){
          var currenMain = mainSpace/2 * mainSign + mainBase
          var step = 0
        }
        if (style.justifyContent === 'space-between') {
          var step = mainSpace / (items.length - 1) * mainSign
          var currenMain = mainBase
        }
        if (style.justifyContent === 'space-around') {
          var step = mainSpace / items.length * mainSign
          var currenMain = step / 2 + mainBase
        }
        for (var i =0; i<items.length; i++) {
          var item = items[i]
          itemStyle[mainStart] = currenMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currenMain = itemStyle[mainEnd] + step
        }
      }
    })
  }

  // 计算交叉轴
  var crossSpace
  if (!style[crossSize]) {
    crossSpace = 0
    elementStyle[crossSize] = 0
    for (var i = 0; i<flexLines.length;i ++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace
    }
  } else {
    crossSpace = style[crossSize]
    for (var i =0; i<flexLines.length;i++) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize]
  } else {
    crossBase = 0
  }
  var lineSize = style[crossSize] / flexLines.length
  var step
  if (style.alignContent === 'flex-start') {
    crossBase += 0
    step  = 0
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace
    step = 0
  }
  if (style.alignContent === 'center'){
    crossBase += crossSign * crossSpace/2
    step = 0
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0
    step = crossSpace / (flexLines.length - 1) 
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLines.length) 
    crossBase += crossSign * step / 2 
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }

  flexLines.forEach(function(items) {
    var lineCrossSize = style.alignContent === 'stretch' ? items.crossSpace + crossSpace / flexLines.length : items.crossSpace
    for (var i = 0; i<items.length; i++) {
      var item = items[i]
      itemStyle = getStyle(item)
      var align = itemStyle.alignSelf || style.alignItems
      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = itemStyle[crossStart]
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign*itemStyle[crossSize]
      }
      if (align === 'center') {
        itemStyle[crossEnd] =  itemStyle[crossEnd] - crossSign*itemStyle[crossSize]
        itemStyle[crossStart] =crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2
      }
      if (align === 'stretch') {
        itemStyle[crossEnd] =  crossBase + crossSign*(itemStyle[crossSize] != null ?itemStyle[crossSize]:lineCrossSize)
        itemStyle[crossStart] = crossBase
        itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  })
}

module.exports = layout