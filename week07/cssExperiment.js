let arr = []
let dom = document.getElementById('container').children
for (let element of dom ) {
  if (element.dataset.tag.match(/css/))
    arr.push( {
      name: element.children[1].children[0].innerHTML,
      url: element.children[1].children[0].href
    })
}
let frame = document.createElement('iframe')
  document.body.innerHTML = ''
  document.body.appendChild(frame)
function happend(element, event) {
  return new Promise ((resolve) => {
    let handler = () => {
      resolve()
      element.removeEventListener(event, handler)
    }
   element.addEventListener(event, handler)
  })
}
void async function () {
  for (let el of arr) {
    frame.src = el.url
    console.log(el.name)
    await happend(frame, 'load')
  }
}()