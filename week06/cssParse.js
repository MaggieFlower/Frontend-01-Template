let parseCss = require('css')
// 将css暂存到数组中
let rule = []
// 收集父元素
let elements = []
// 计算选择器跟元素的匹配
function match (element, selector) {
  if(!element || !selector) return false
  if (selector.charAt(0) === '#') {
    // 照顾那些没有attributes的元素
    var attr = element.attributes && element.attributes.filter(attr => attr.name === 'id')[0]
    if (attr && attr.value === selector.replace('#', '')) return true
  } else if (selector.charAt(0) === '.') {
    var attr = element.attributes && element.attributes.filter(attr => attr.name === 'class')[0]
    // .class1.class2
    if ( attr && attr.value.split(' ').length > 1 ) {
      let attrSplit = attr.value.split(' ')
      selector = selector.split('.')
      selector.shift()
      let selectorSplit = selector
      if ( attrSplit.length === selectorSplit.length ) {
        return attrSplit.every((item) => {return selectorSplit.indexOf(item) > -1})
      } else {
        return false
      }
    } else {
      if (attr && attr.value === selector.replace('.', '')) return true
    }
  } else if (selector.includes('.') && selector.includes('#')&&selector.includes('=')){
    /*
    固定顺序: div.el#el[pg=10]
    element.attributes: [Object, Object, Object]
    selector: div.el#el[pg=100]
    */
    let part = element.attributes
    // div
    let p1 = selector.slice( 0, selector.match(/\./).index)
    // el
    let p2 = selector.slice( selector.match(/\./).index, selector.match(/#/).index).replace('.', '')
    // el
    let p3 = selector.slice( selector.match(/#/).index, selector.match(/\[/).index).replace('#', '')
    // ['pg', '100']
    let p4 = selector.slice( selector.match(/\[/).index).replace('[', '').replace(']', '').split('=')
    let tagPart = p1 === element.tagName
    let flag = false
    if (!tagPart) return false
    for (let p of part) {
      if (p.name === "class") {
        flag = p.value === p3
      } else if (p.name === 'id') {
        flag =  p.value === p2
      } else if (p.name === p4[0]) {
        flag = p.value === p4[1]
      } 
    }
    return flag
  } else {
    if (element.tagName === selector) {
      return true
    }
  }
  return false
}
function specificity(selector){
  
  /*
 inline, id, class, type
  [0,    0,  0,     0]
  */
 selector = selector.split(' ')
  var p = [0, 0, 0, 0]
  for (let part of selector) {
    if (part.charAt(0) === "#" ){
      p[1] += 1
    } else if (part.charAt(0) == '.') {
      p[2] += 1
      if(part.match(/[\.]/g) && part.match(/[\.]/g).length > 1){
        p[2] = p[2] + (part.match(/[\.]/g).length - 1)
      }
    } else {
      p[3] += 1
      if (part.match(/[\.#=]/g) && part.match(/[\.#=]/g).length > 1) {
        p[1] += part.match(/[#]/g).length
        p[2] += part.match(/[.]/g).length
      }
    }
  }
  return p
}
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  } else if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  } else if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }
  return sp1[3] - sp2[3]
}
// 如果是遇到有link标签的, 会先去请求然后再合并
module.exports = {
  addCssRules: function (cssRule) {
    let ast = parseCss.parse(cssRule)
    rule.push(...ast.stylesheet.rules)
  },
  computeCSS: function (element) {
    // 让css的规则从当前元素开始匹配规则
    let elements = []
    let el = element
    while(true) {
      if (el.parent === undefined || el.parent === null) break
        elements.push(el.parent)
        el = el.parent
    }
    elements = elements.slice()
    if(!element.computedStyle) {
      element.computedStyle = {}
    }
    if (rule) {
      for (let r of rule) {
        var selectorParts = r.selectors[0].split(' ').reverse()
        if (!match(element, selectorParts[0])) continue
        var j = 1
        for (var i=0;i<elements.length; i++) {
          if (match(elements[i], selectorParts[j])) j++
        }
        if (j >= selectorParts.length - 1) matched = true
        if (matched) {
          // 匹配到属性, 应用到元素上
          let sp = specificity(r.selectors[0])
          var computedStyle = element.computedStyle
          for (var declaration of r.declarations) {
            if (!computedStyle[declaration.property]) {
              computedStyle[declaration.property] = {}
            }
            if (!computedStyle[declaration.property].specificity){
              computedStyle[declaration.property].specificity = sp
              computedStyle[declaration.property].value = declaration.value
            } else if (compare(sp, computedStyle[declaration.property].specificity) > 0) {
              computedStyle[declaration.property].specificity = sp
              computedStyle[declaration.property].value = declaration.value
            }
          }
        }
      }
    }
  }
}