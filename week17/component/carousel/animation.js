export class Timeline {
  constructor () {
    this.animations = new Set()
    this.animationId = 0
    this.pauseTime = Date.now()
    this.state = "init"
    this.startTime = Date.now()
    this.forRestartanimations = new Set()
  }
  tick(){
    for(let a of this.animations) {
      let {object, property, start, stop, duration, delay, template, timingfunction, startTime} = a
      let progression = timingfunction((Date.now() - startTime - delay)/duration)
      if (progression >=1) {
        progression = 1
        this.animations.delete(a)
      }
      object[property] = template(start + (stop - start)*progression)
    }
    if (this.animations.size) {
      this.animationId = requestAnimationFrame(() => {this.tick()})
    }
    
  }
  start (){
    this.startTime = Date.now()
    this.state = 'playing'
    this.tick()
  }
  reset (){
    this.animations = new Set()
    this.animationId = 0
    this.pauseTime = Date.now()
    this.state = "init"
    this.startTime = Date.now()
  }
  resume () {
    if (this.state == 'paused') {
      let t = Date.now()
      for (let a of this.animations) {
        a.startTime = t - this.pauseTime + a.startTime
      }
      this.start()
    }
  }
  pause(){
    if (this.state == 'playing') {
      this.pauseTime = Date.now()
      cancelAnimationFrame(this.animationId)
      this.state = 'paused'
    }
  }
  add (animation){
    
    if (this.state == 'playing' && animation.together) {
      animation.startTime = this.startTime
    } else {
      animation.startTime = Date.now()
    }
    this.animations.add(animation)
  }
}

export class Animation {
  constructor (object, property, start, stop, duration, delay, template, timingfunction, together) {
    this.object = object
    this.property = property
    this.start = start
    this.stop = stop
    this.duration = duration
    this.delay = delay || 0
    this.template = template
    this.timingfunction = timingfunction
    this.together = together || false
  }
}