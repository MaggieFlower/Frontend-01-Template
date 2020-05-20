const EOF = Symbol("EOF")// End of File
let currentToken = null
let currentAttribute = null
let currentTextNode = {
  type: 'text',
  content: ''
}
// console.log(JSON.stringify(res, null, ' '))
let cssParse = require('./cssParse')
let stack = [{type: "document", children: []}]
function emit(token) {
  let element = {
    type: 'element',
    attributes: [],
    children: [],
  }
  if (token.type === 'startTag') {
    top = stack[stack.length - 1]
    element.tagName = token.tagName
    // 属性push
    for (let p in token) {
      if (p != 'type' && p != 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    top.children.push(element)
    element.parent = top
    // 给元素调用css样式, 每收集到一个元素就应用css样式
    cssParse.computeCSS(element)
    if (!token.isSelfClosing){
      stack.push(element)
    }
    currentTextNode = {
      type: 'text',
      content: ''
    }
  } else if (token.type === "endTag") {
    // console.log(stack )
    let lastEl = stack[stack.length - 1]
    if (lastEl.tagName != token.tagName) {
      throw new Error('error')
    } else {
      /* 收集style里面的样式信息, 不考虑link和行内元素的样式 */
      
      if (lastEl.tagName == 'style') {
        // 收集css规则
        cssParse.addCssRules(lastEl.children[0].content)
      }
      stack.pop()
    }
    currentTextNode = {
      type: 'text',
      content: ''
    }
  } else if (token.type === 'text') {
    let lastEl = stack[stack.length - 1]
    if (lastEl.tagName == 'style' ) {
      currentTextNode.content += token.content
    }
    if (token.content === "}") {
      lastEl.children[0] = currentTextNode
    }
  }
}
function data(c){
  if(c==="<"){
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: "EOF"
    })
  } else {
    emit({
      type: "text",
      content: c
    })
    return data
  }
}
// \t\n\f
// 第一步: 主要的标签有: 开始标签, 结束标签, 自封闭标签
function tagOpen(c){
  if (c == '/'){
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    return data(c)
  }
}

function endTagOpen(c){
  if (c.match(/^[\t\n\f ]$/)){
    currentToken = {
      type: 'endTag',
      tagName: ""
    }
    return tagName(c)
  } else if (c == '>') {
  }else if (c == EOF) {
  } else {
    currentToken = {
      type: 'endTag',
      tagName: ""
    }
    return tagName(c)
  }
}
function tagName (c){
  if (c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  } else if (c == '/') {
    return selfClosingStartTag
  }else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c == ">") {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}
function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  } else if (c == '/' || c == '>' || c == EOF) {
    return afterAttrbuteName(c)
  } else if (c == '=') {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName
  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c)
  }
}
function attributeName (c) {
  if (c.match(/^[\t\n\f ]$/) || c =="/" || c == ">" || c == EOF){
    return afterAttrbuteName(c)
  } else if (c == '=') {
    return beforeAttributeValue
  } else if (c == '\u0000') {
  }else if (c == "\"" || c == "'" || c == "<") {
  }else {
    currentAttribute.name += c
    return attributeName
  }
}
function afterAttrbuteName (c) {
  if (c.match(/^[\t\n\f ]$/)){
    return afterAttrbuteName
  } else if (c == '/') {
    return selfClosingStartTag
  } else if (c == '=') {
    return beforeAttributeValue
  } else if (c == '>') {
    emit(currentToken)
    return data
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    attributeName(c)
  }
}
function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c =="/" || c == ">" || c == EOF){
    return beforeAttributeValue
  } else if (c == "\"") {
    return doubleQuoteAttributeValue
  } else if (c == "\'") {
    return singleQuoteAttributeValue
  } else if (c == ">") {
    emit(currentToken)
    return data
  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue(c)
  }
}
function doubleQuoteAttributeValue(c){
  if (c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c == "\u0000") {
  }else if (c == EOF) {
  }else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}
function singleQuoteAttributeValue(c){
  if (c == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c == "\u0000") {
  }else if (c == EOF) {
  }else {
    currentAttribute.value += c
    return singleQuoteAttributeValue
  }

}
function afterQuoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == "/") {
    return selfClosingStartTag
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c
    return beforeAttributeName(c)
  }
}
function UnquotedAttributeValue(c){
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  }else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken);
    return data
  } else if ( c == "\u0000") {
  }else if (c == '\"' || c == "\'" || c == "<" || c == "=" || c == "`") {
  } else if (c == EOF) {
  }else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
  
}
function selfClosingStartTag (c) {
  if (c == ">") {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === "EOF") {
  } else {
    return beforeAttributeName(c)
  }
}

module.exports.parseHTML = function parseHTML (html) {
  let state = data
  for(let c of html) {
    // console.log('state: ' , state)
    if (typeof state === 'function') state = state(c)
  }
  // 处理文件结束 
  data(EOF)
  return stack
  // console.log(html)
}