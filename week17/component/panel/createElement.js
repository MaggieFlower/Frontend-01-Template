export function createElement (panel, attrs, ...children){
  let el
  if (typeof panel == 'string') {
    el = new Text(panel)
  } else {
    el = new Panel
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
export class Panel {
  constructor () {
    this.root = document.createElement('div')
    this.children = []
    this.data = []
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
  select(i) {
    let titleChildren = document.querySelector('#h1').children
    for (let child of this.children) {
      child.root.parentElement.classList.add('un-selected')
      child.root.parentElement.classList.remove('selected')
    }
    this.children[i].root.parentElement.classList.remove('un-selected')
    this.children[i].root.parentElement.classList.add('selected')
    for (let child of titleChildren) {
      child.classList.add('title-unselected')
    }
    titleChildren[i].classList.remove('title-unselected')
    titleChildren[i].classList.add('title-selected')
  }
  render () {
    setTimeout(() => {this.select(0)}, 16)
    let titleView = this.children.map((child, index) => <span click={() => this.select(index)} class='title-unselected title'>{this.data[index]}</span>)
    let contentView = this.children.map((child, index) => <div class='un-selected content'> {child} </div> )
    return <div class="index"><h1 id="h1">{titleView}</h1> {contentView}</div>
  }
  mountTo (parent) {
    this.root.appendChild(this.render().root)
    parent.appendChild(this.root.children[0])
  }
}