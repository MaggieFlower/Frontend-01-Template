export class Timeline {
  constructor () {
    this.animations = []
    this.animationID = 0
    this.state = "inited"
  }
  tick () {
    let t = Date.now() - this.startTime
    // 控制每个盒子是否到达了终点
    let animations = this.animations.filter(am => am.finished != true)
    let value
    for (let animation of animations) {
      let {object, property,template, start, end, duration, delay, timingFunction, startTime} =  animation
      if (duration == 0) {
        object[property] = start + template(value)
        if (end == -1500)
          console.log('value:::::', start, end, end - start)
        if (t > delay + startTime) {
          animation.finished = true
        }
      } else {
        let progression = timingFunction((t - delay - startTime) / duration)
        if (t > duration + delay + startTime) {
          progression = 1
          animation.finished = true
        }
        if (typeof start == 'object') {
          value = `${start.r + progression*(end.r - start.r)}, ${start.g + progression*(end.g - start.g)}, ${start.b+ progression*(end.b - start.b)}`
          object[property] = template(value)
        } else {
          value = start + Math.floor(progression * (end - start))
          object[property] = template(value)
        }
      }

      
      //object[property] = `translateX(${Math.floor(timingFunction.bind(this)(start, end))}px)`
      
    }
    if (animations.length != 0) {
      this.animationID = requestAnimationFrame(() => this.tick())
    }
  }
  pause () {
    if (this.animationID != null && this.state == 'playing') {
      this.pauseTime = Date.now()
      cancelAnimationFrame(this.animationID)
      this.state = 'paused'
    }
  }
  resume () {
    if (this.state == 'paused') {
      this.startTime += Date.now() - this.pauseTime
      this.start()
      this.state = 'playing'
    }
  }
  restart () {
    if (this.state == 'playing')
      this.pause()
    this.animations = []
    this.animationID = 0
    this.state = "inited"
    this.startTime = Date.now()
    this.start()
  }
  start () {
    this.startTime = Date.now()
    this.state = "playing"
    this.tick()
  }
  add (animation, startTime) {
    this.animations.push(animation)
    if (this.state == 'playing') {
      animation.startTime = startTime == void 0 ? Date.now()-this.startTime : startTime
    } else {
      animation.startTime = startTime == void 0 ? 0 : startTime
    }
  }
}

export class Animation {
  constructor (object, property,template, start, end, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration || 0
    this.delay = delay || 0
    this.timingFunction = timingFunction
  }
} 