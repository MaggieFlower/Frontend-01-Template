export function createElement (panel, attrs, ...children){
  let el
  if (typeof panel == 'string') {
    el = new Text(panel)
  } else {
    el = new ListView
  }
  for (let attr in attrs) {
    if (attr == 'data'){
      el.data = attrs[attr]
    } else {
      el.setAttribute(attr, attrs[attr])
    }
  }
  for (let child of children) {
    if (typeof child == 'string'){
      el.appendChild(document.createTextNode(child))
    }else if (child instanceof Array){
      for(let c of child) {
        el.appendChild(c.root)
      }
    } else if (typeof child == 'function'){
      for (let c of child(el.data)) {
        el.appendChild( c.root )
      }
      
    } else {
      el.appendChild(child.root)
      el.children && el.children.push(child)
    }
  }
  return el
}
export class Text {
  constructor(type){
    this.root = document.createElement(type)
  }
  setAttribute(attr, value){
    if (typeof value == "function") {
      this.root.addEventListener(attr, value)
    } else {
      this.root.setAttribute(attr, value)
    }
    
  }
  appendChild(child) {
    this.root.appendChild(child)
  }
}
export class ListView {
  constructor () {
    this.root = document.createElement('div')
    this.children = []
    this._data = []
  }
  get data () {
    return this._data
  }
  set data (list) {
    this._data = list
  }
  setAttribute(attr, value){
    if (typeof value == "function") {
      this.root.addEventListener(attr, value)
    } else {
      this.root.setAttribute(attr, value)
    }
  }
  appendChild(child) {
    this.root.appendChild(child)
  }
  render () {}
  mountTo (parent) {
    // this.root.appendChild(this.render().root)
    parent.appendChild(this.root)
  }
}