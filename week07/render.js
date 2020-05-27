const images = require('images')
let viewport = images(800, 800)
function render (element) {
  var img = images(element.style.width, element.style.height)
  if (element.style) {
    if (element.style['background-color']){
      let color = element.style['background-color'] || "rgb(255,255,255)"
      color.match(/rgb\((\d+),[ ]*(\d+),[ ]*(\d+)\)/)
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
      viewport.draw(img, element.style.left||0, element.style.top||0)
    }
    for (child of element.children) {
      render(child)
    }
  }
  return viewport
}

module.exports = render
