
function getNext(string){
  if (typeof string != 'string') return
  let i = 0;
  let j = -1;
  let next = [-1]
  for (i; i < string.length;) {
    if(j == -1 || string[i] === string[j]) {
      i ++
      j ++
      next[i] = j
    } else {
      j = -1
    }
  }
  return next
}
class FindStr {
  constructor(substr, str) {
    this.next = getNext(substr)
    this.len = substr.length
    this.strLen = str.length
    this.str = str
    this.substr = substr
    this.j = 0
    this.current = 0
  }
  data () {
    this.state = this.start
    for(let i=0;i<this.strLen; i++) {
      if (typeof this.state === 'function') this.state = this.state(i, this.str[i])
    }
    return this.state === this.end
  }
  end () {
    return this.end
  }
  start (strIndex, strValue) {
      if (strValue === this.substr[this.j]) {
        this.j ++
        return this.findIndex1
      }
      if (strIndex >= this.strLen - this.len) return false
      return this.start
  }
  publicFn(strIndex, strValue){
    if (strValue === this.substr[this.j]) {
      this.j ++
      if (this.j === this.len) return this.end
      if (this.j < this.len) return this.publicFn
    } else {
      if (strIndex >= this.strLen - this.len) return false
      this.j = this.next[this.j];
      return this.start(strIndex, strValue)
    }
  }
  findIndex1 (strIndex, strValue) {
    return this.publicFn(strIndex, strValue)
  }
}


let f = new FindStr('231', '12334534203134')
console.log( f.data() ) // false
f = new FindStr('acfac', 'abcdefacabcdacfacfe')
console.log( f.data() ) // true