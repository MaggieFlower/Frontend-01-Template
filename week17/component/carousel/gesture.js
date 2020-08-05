export function enableGesture(element) {
  let MOUSE_SYMBOL = Symbol('mousemove')
  let context = Object.create(null)

  let touchstart = (event, context) => {

    context.startX = event.clientX
    context.startY = event.clientY
    context.moves = []
    context.isTap = true
    context.isPan = false
    context.isPress = false
    console.log('touchstart: ')
    element.dispatchEvent(new CustomEvent('tapstart', {
      detail: {
        startX: context.startX,
        startY: context.startY,
        clientX: event.clientX,
        clientY: event.clientY
      }
    }))
    // 大于500ms即视为是press事件
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) return
      context.isTap = false
      context.isPan = false
      context.isPress = true
    }, 500)



  }
  let touchmove = (event, context) => {
    let dx = event.clientX - context.startX,
      dy = event.clientY - context.startY
    context.moves.push({
      dx,
      dy,
      t: Date.now()
    })

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      context.isTap = false
      context.isPan = true
      context.isPress = false
      context.moves = context.moves.filter(item => Date.now() - item.t < 300)
      element.dispatchEvent(new CustomEvent('panstart', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: event.clientX,
          clientY: event.clientY
        }
      }))
    }
    element.dispatchEvent(new CustomEvent('pan', {
      detail: {
        startX: context.startX,
        startY: context.startY,
        clientX: event.clientX,
        clientY: event.clientY
      }
    }))
  }
  let touchend = (event, context) => {
    if (context.isTap) {
      element.dispatchEvent(new CustomEvent('tapend', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: event.clientX,
          clientY: event.clientY
        }
      }))
      clearTimeout(context.timeoutHandler)
    } else if (context.isPan) {
      let move = context.moves[0]
      let rate = Math.sqrt((event.clientX - move.dx) ** 2 + (event.clientY - move.dy) ** 2) / (Date.now() - move.t)
      if (rate > 5) {
        element.dispatchEvent(new CustomEvent('flick', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: event.clientX,
            clientY: event.clientY
          }
        }))
      } else {
        element.dispatchEvent(new CustomEvent('panend', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: event.clientX,
            clientY: event.clientY
          }
        }))
      }

    } else if (context.isPress) {
      element.dispatchEvent(new CustomEvent('pressend', {
        detail: {
          startX: context.startX,
          startY: context.startY,
          clientX: event.clientX,
          clientY: event.clientY
        }
      }))
    }
  }
  let touchcancel = (event, context) => {
    element.dispatchEvent(new CustomEvent('touchcancel', {
      detail: {
        startX: context.startX,
        startY: context.startY,
        clientX: event.clientX,
        clientY: event.clientY
      }
    }))
  }
  element.addEventListener('touchstart', (event) => {
    for (let touch of event.changedTouches) {
      context[touch.identifier] = Object.create(null)
      touchstart(touch, context[touch.identifier])
    }

  })
  element.addEventListener('touchmove', (event) => {
    for (let touch of event.changedTouches) {
      touchmove(touch, context[touch.identifier])
    }

  })
  element.addEventListener('touchend', (event) => {
    for (let touch of event.changedTouches) {
      touchend(touch, context[touch.identifier])
      delete context[touch.identifier]
    }

  })
  element.addEventListener('touchcancel', (event) => {
    for (let touch of event.changedTouches) {
      touchcancel(touch, context[touch.identifier])
      delete context[touch.identifier]
    }
  })

  element.addEventListener('mousedown', (event) => {
    context[MOUSE_SYMBOL] = Object.create(null)
    touchstart(event, context[MOUSE_SYMBOL])
    
    let mousemove = (event) => {
      touchmove(event, context[MOUSE_SYMBOL])
    }

    let mouseup = (event) => {
      touchend(event, context[MOUSE_SYMBOL])
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  })
}