import {  Animation,  Timeline} from './animation'
import {  cubicBezier} from './cubicBezier'
import {  enableGesture} from './gesture'

export function createElement(cls, attrs, ...children) {
  let root
  if (typeof cls == 'string') {
    root = new Text(cls)
  } else {
    root = new cls(attrs.data)
  }
  for (let attr in attrs) {
    if (attr != 'data')
      root.setAttributes(attr, attrs[attr])
  }
  for (let child of children){
    if (typeof child == 'string')
      root.root.appendChild(document.createTextNode(child))
    else{
      if (child.length != void 0 && child.length !=0) {
        for (let c of child) {
          root.root.appendChild(c.root)
        }
      } else {
        root.root.appendChild(child.root)
      }
    }
  }
  return root
}
class Text{
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttributes (attrs, value) {

    if (typeof value == 'function') {
      
      this.root.addEventListener(attrs, value)
    } else{
      if (attrs == 'enableGesture' && value) {
        enableGesture(this.root)
      } else {
        this.root.setAttribute(attrs, value)
      }
    }
  }
  getAttributes (attrs) {
    return this.root.getAttributes(attrs)
  }
}
export class Carousel {
  constructor(data) {
    this.data = data
    this.root = document.createElement('template')
  }
  render() {
    let tl = new Timeline
    let position = 0
    let setTimeoutId = 0
    let startX, current, next, last, nextPosition, lastPosition
    let children = this.data.map(url => {
      let img = <img src={url} tapstart={start} flick={flick} pan={pan} panend={panend} enableGesture={true}/>
      img.root.addEventListener('dragstart', event => event.preventDefault())
      return img
    })
    function pan (event)  {
      current.style.transform = `translateX(${event.detail.clientX - startX - position * 500}px)`
      next.style.transform = `translateX(${event.detail.clientX - startX + 500 - nextPosition * 500}px)`
      last.style.transform = `translateX(${event.detail.clientX - startX - 500 - lastPosition * 500}px)`
    }

    function panend (event)  {
      let offset = 0
      if (event.detail.clientX - startX <= -250) {
        offset = 1
      } else if (event.detail.clientX - startX >= 250) {
        offset = -1
      }

      tl.add(new Animation(current.style, 'transform', Number(current.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        -(position + offset) * 500, 500, 0,  v => `translateX(${v}px)`, t => t))
      tl.add(new Animation(last.style, 'transform', Number(last.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        -500 - (lastPosition + offset) * 500, 500, 0,  v => `translateX(${v}px)`, t => t))
      tl.add(new Animation(next.style, 'transform',  Number(next.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        500 - (nextPosition + offset) * 500, 500, 0, v => `translateX(${v}px)`, t => t))
      tl.start()
      position = (position + offset + children.length) % children.length
      setTimeoutId = setTimeout(() => {
        nextPic()
      }, 2000)
    }

    function start (event) {
      tl.reset()
      clearTimeout(setTimeoutId)
      startX = event.detail.clientX
      nextPosition = (position + 1) % children.length
      lastPosition = (position - 1 + children.length) % children.length

      current = children[position].root
      next = children[nextPosition].root
      last = children[lastPosition].root
    }
    function flick (event){
      let offset = 0
      if (event.detail.clientX - startX < 0) {
        offset = 1
      } else if (event.detail.clientX - startX > 0) {
        offset = -1
      }

      tl.add(new Animation(current.style, 'transform',  Number(current.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        -(position + offset) * 500, 500, 0, v => `translateX(${v}px)`,t => t))
      tl.add(new Animation(last.style, 'transform', Number(last.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        -500 - (lastPosition + offset) * 500, 500, 0, v => `translateX(${v}px)`, t => t))
      tl.add(new Animation(next.style, 'transform',  Number(next.style.transform.match(/[+-]{0,1}\d+/g)[0]),
        500 - (nextPosition + offset) * 500, 500, 0,v => `translateX(${v}px)`, t => t))
      tl.start()
      position = (position + offset + children.length) % children.length
      setTimeoutId = setTimeout(() => {
        nextPic()
      }, 2000)
    }
    let nextPic = () => {

      let lastPosition = (position - 1 + children.length) % children.length
      let nextPosition = (position + 1) % children.length

      let current =children[position].root
      let next = children[nextPosition].root
      let last = children[lastPosition].root
      tl.add(new Animation(current.style, 'transform', -position * 100, -100 - position * 100, 500, 0, v => `translateX(${v}%)`, t => t))
      tl.add(new Animation(last.style, 'transform', -100 - lastPosition * 100, 100 - lastPosition * 100, 0, 0, v => `translateX(${v}%)`, t => t))
      tl.add(new Animation(next.style, 'transform', 100 - nextPosition * 100, -nextPosition * 100, 500, 0, v => `translateX(${v}%)`, t => t))
      tl.start()
      position = (position + 1) % children.length

      setTimeoutId = setTimeout(() => {
        nextPic()
      }, 2000)
    }
    setTimeoutId = setTimeout(() => {
      nextPic()
    }, 2000)
    return <div class="carousel">
      {children}
    </div>

  }
  setAttributes (attrs, value) {
    if (typeof value == 'function') {
      this.root.addEventListener(attrs, value)
    } else{
      this.root.setAttribute(attrs, value)
    }
  }
  mountTo(parent) {
    this.root.appendChild(this.render().root)
    parent.appendChild(this.root.children[0])
  }
}

let carousel = < Carousel data = {['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/4.jpg']} >
  </ Carousel>
carousel.mountTo(document.body)
carousel.render()