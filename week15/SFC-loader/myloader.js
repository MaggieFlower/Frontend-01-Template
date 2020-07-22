var parser = require('./parser')
module.exports = function (source) {
  let tree = parser.parseHTML(source)
  var template = null
  for (let child of tree.children) {
   if (child.tagName == 'template') {
     template = child
   }
  }
  let visit = (node) => {
    let data = []
    if (node.children.length) {
      for (let childs of node.children) {
        if (childs.type == 'text') {
          data.push(`"${childs.content}"`)
        } else {
          data.push(visit(childs))
        }
      }
    }
    let attrs = {}
    for (let attr of node.attributes) {
      attrs[attr.name] = attr.value
    }
    return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${data.length ==0?null:data})`
  }
  return `
  import {createElement, Div, Text} from '../../main_jsxpractise.js'
  export  class Car {
    constructor () {
      this.root = null
    }
    render () {
      this.root = ${visit(template)}
    }
    mountTo (parent) {
      parent.appendChild(this.root.root.children[0])
    }
  }
  `
}