import {  Animation,  Timeline} from './animation'
import {  cubicBezier} from './cubicBezier'
import {  enableGesture} from './gesture'

export function createElement(fn, data) {
  let d = data.data.split(',')
  return new fn(d)
}

export class Carousel {
  constructor(data) {
    this.data = data
    this.root = document.createElement('div')
    this.root.setAttribute('class', 'container')
  }
  render() {
    let tl = new Timeline
    document.body.addEventListener('contextmenu', event => event.preventDefault())
    for (let d of this.data) {
      let img = document.createElement('img')
      img.src = d
      img.addEventListener('dragstart', event => event.preventDefault())
      this.root.appendChild(img)
    }

    let position = 0
    let setTimeoutId = 0
    let nextPic = () => {

      let lastPosition = (position - 1 + this.data.length) % this.data.length
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.children[position]
      let next = this.root.children[nextPosition]
      let last = this.root.children[lastPosition]

      current.style.transform = `translateX(${- position*100}%)`
      last.style.transform = `translateX(${- 100 - lastPosition*100}%)`
      next.style.transform = `translateX(${100 - nextPosition*100}%)`
      tl.add(new Animation(current.style, 'transform', v => `translateX(${v}%)`, -position * 100, -100 - position * 100, 500, 0, t => t), 0)
      tl.add(new Animation(last.style, 'transform', v => `translateX(${v}%)`, -100 - lastPosition * 100, 100 - lastPosition * 100, 0, 0, t => t), 0)
      tl.add(new Animation(next.style, 'transform', v => `translateX(${v}%)`, 100 - nextPosition * 100, -nextPosition * 100, 500, 0, t => t), 0)
      tl.start()
      position = (position + 1) % this.data.length
      setTimeoutId = setTimeout(() => {
        nextPic()
      }, 2000)
    }
    let mouse = () => {
      let startX, current, next, last, nextPosition, lastPosition
      let move = (event) => {
        current.style.transform = `translateX(${event.detail.clientX - startX - position * 500}px)`
        next.style.transform = `translateX(${event.detail.clientX - startX + 500 - nextPosition * 500}px)`
        last.style.transform = `translateX(${event.detail.clientX - startX - 500 - lastPosition * 500}px)`
      }

      let up = (event) => {
        let offset = 0
        if (event.detail.clientX - startX <= -250) {
          offset = 1
        } else if (event.detail.clientX - startX >= 250) {
          offset = -1
        }

        tl.add(new Animation(current.style, 'transform', v => `translateX(${v}px)`, Number(current.style.transform.match(/[+-]{0,1}\d+/g)[0]),
          -(position + offset) * 500, 500, 0, t => t), 0)
        tl.add(new Animation(last.style, 'transform', v => `translateX(${v}px)`, Number(last.style.transform.match(/[+-]{0,1}\d+/g)[0]),
          -500 - (lastPosition + offset) * 500, 500, 0, t => t), 0)
        tl.add(new Animation(next.style, 'transform', v => `translateX(${v}px)`, Number(next.style.transform.match(/[+-]{0,1}\d+/g)[0]),
          500 - (nextPosition + offset) * 500, 500, 0, t => t), 0)
        tl.start()
        position = (position + offset + this.data.length) % this.data.length
        setTimeoutId = setTimeout(() => {
          nextPic()
        }, 2000)
        // document.removeEventListener('pan', move)
        // document.removeEventListener('panend', up)
      }
      for (let child of this.root.children) {
        child.addEventListener('tapstart', (event) => {
          tl.restart()
          clearTimeout(setTimeoutId)
          startX = event.detail.clientX
          nextPosition = (position + 1) % this.data.length
          lastPosition = (position - 1 + this.data.length) % this.data.length

          current = this.root.children[position]
          next = this.root.children[nextPosition]
          last = this.root.children[lastPosition]

          current.style.transition = "ease 0s"
          next.style.transition = "ease 0s"
          last.style.transition = "ease 0s"
        })
        
        child.addEventListener('flick', (event) => {
          console.log(event.detail.clientX, startX)
          let offset = 0
          if (event.detail.clientX - startX < 0) {
            offset = 1
          } else if (event.detail.clientX - startX > 0) {
            offset = -1
          }
  
          tl.add(new Animation(current.style, 'transform', v => `translateX(${v}px)`, Number(current.style.transform.match(/[+-]{0,1}\d+/g)[0]),
            -(position + offset) * 500, 500, 0, t => t), 0)
          tl.add(new Animation(last.style, 'transform', v => `translateX(${v}px)`, Number(last.style.transform.match(/[+-]{0,1}\d+/g)[0]),
            -500 - (lastPosition + offset) * 500, 500, 0, t => t), 0)
          tl.add(new Animation(next.style, 'transform', v => `translateX(${v}px)`, Number(next.style.transform.match(/[+-]{0,1}\d+/g)[0]),
            500 - (nextPosition + offset) * 500, 500, 0, t => t), 0)
          tl.start()
          position = (position + offset + this.data.length) % this.data.length
          setTimeoutId = setTimeout(() => {
            nextPic()
          }, 2000)
        })
        child.addEventListener('pan', move)
        child.addEventListener('panend', up)
        enableGesture(child)
      }
    }
    mouse()
    nextPic()
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

let carousel = < Carousel data = "./img/1.jpg,./img/2.jpg,./img/3.jpg,./img/4.jpg" >
  </ Carousel>
carousel.mountTo(document.body)
carousel.render()