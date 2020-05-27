function getStyle (element) {
  if (element.style === void undefined) element.style = {}
  for (let prop in element.computedStyle) {
    if (element.computedStyle[prop].value.toString().match(/px$/) || element.computedStyle[prop].value.toString().match(/^[0-9\.]+$/)){
      element.style[prop] = parseInt(element.computedStyle[prop].value)
      continue
    }
    element.style[prop] = element.computedStyle[prop].value
  }
  return element.style
}

function layoutMyself( element ){
  var mainSize = 'width',
  mainStart = 'left',
  mainEnd = 'right',
  crossSize = 'height',
  crossStart = 'top',
  crossEnd = 'bottom';
  let mainSpace = 0
  let crossSpace = 0
  let step = 0
  let allHeight = 0
  totalFlex = 0
  // flex-wrap = wrap
  let flexLine = []
  let flexLines = [flexLine]
  let elChilds = []
  getStyle(element)
  for (let child of element.children) {
    elChilds.push( getStyle(child) )
  }
  // 计算位置
  mainSpace = element.style[mainSize]
  flexLine.mainSpace = mainSpace
  flexLine.crossSpace = crossSpace
  flexLines.crossSpace = element.style[crossSize]
  // 算一下一共有几排元素
  for (let elStyle of elChilds) {
    if (mainSpace < elStyle[mainSize]) {
      flexLine = [elStyle]
      flexLine.mainSpace = mainSpace
      flexLine.crossSpace = crossSpace
      mainSpace = element.style[mainSize]
      flexLines.push(flexLine)
    } else {
      flexLine.push(elStyle)
    }
    mainSpace -= elStyle[mainSize]
  }
  for (let flexLine of flexLines) {
    let arr = []
    for (let pos of flexLine) {
      // 每flex-line有用高度最高的元素
      if (pos[crossSize] === '' || pos[crossSize] === void undefined) continue
      arr.push(pos[crossSize])
    }
      allHeight += Math.max(...arr)
      flexLine.crossSpace = Math.max(...arr)
  }
  step = (flexLines.crossSpace - allHeight) / 4
  // 每行flexLine的高度
  for (let flexLine of flexLines) {
    flexLine.crossSpace = flexLine.crossSpace + step * 2
  }
  for (let flexLine of flexLines) {
    let space = 0
    for (let pos of flexLine) {
      if (pos[crossSize] === '' || pos[crossSize] === void undefined) {
        pos[crossSize] = flexLine.crossSpace
        pos[crossStart] = 0
        pos[crossEnd] = flexLine.crossSpace
        if(flexLine.indexOf(pos) === 0) {
          pos[mainStart] = 0
          pos[mainEnd] = pos[mainSize]
        } else {
          pos[mainEnd] = space
          pos[mainStart] = space + pos[mainSize]
        }
      }
      if (pos['align-self'] === 'center') {
        if (flexLines.indexOf(flexLine) === 1) {
          pos[crossStart] = flexLines[0].crossSpace + step
          pos[crossEnd] = pos[crossSize]  + flexLines[0].crossSpace + step
        } else {
          pos[crossStart] = step
          pos[crossEnd] = step + pos[crossSize]
        }
        if(flexLine.indexOf(pos) === 0) {
          pos[mainStart] = 0
          pos[mainEnd] = pos[mainSize]
        } else {
          pos[mainStart] = space
          pos[mainEnd] = pos[mainSize] + space
        }
      }
      if (pos['align-self'] === 'flex-end'){
        pos[crossEnd] = flexLine.crossSpace
        pos[crossStart] = flexLine.crossSpace - pos[crossSize]
        if(flexLine.indexOf(pos) === 0) {
          pos[mainStart] = 0
          pos[mainEnd] = pos[mainSize]
        } else {
          pos[mainStart] = space
          pos[mainEnd] = space + pos[mainSize]
        }
      }
      space += pos[mainSize]
    }
  }
}

module.exports = layoutMyself