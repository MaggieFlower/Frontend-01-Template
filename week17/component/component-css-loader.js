let css = require('css')
console.log('sdfsdf')
module.exports=function (source) {
  console.log('source: ', source)
  let name = this.resourcePath.match(/([^\\]+).css/)[1]
  let stylesheet = css.parse(source)
  for (let rule of stylesheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map(s => {
      if (!s.match(RegExp(`${name}`))){
        s = `.${name} ${s}`
      }
      return s
    })
  }
  return `
   let style = document.createElement('style')
   style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
   document.head.appendChild(style)
  `
}