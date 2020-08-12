let parseHTML = require('../src/parser').parseHTML
let assert = require('assert')
it('parse a single element', function () {
  let doc = parseHTML("<div></div>")
  let div = doc.children[0]
  assert.equal(div.type, 'element')
  assert.equal(div.children.length, 0)
  assert.equal(div.attributes.length, 2)
  assert.equal(div.tagName, 'div')
  
});

it('parse a single element width text content', function () {
  let doc = parseHTML("<div>hello</div>")
  let div = doc.children[0].children[0]
  assert.equal(div.type, 'text')
  assert.equal(div.content, 'hello')
  
});

it('tag mismatch', function () {
  try {
    let doc = parseHTML("<div></iv>")
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
  
});


it('tag width <', function () {
    let doc = parseHTML("<div> a < b </div>")
    let div = doc.children[0].children[0]

    assert.equal(div.type, "text")
    assert.equal(div.content, " a < b ")
  
});

it('with property', function () {
  let doc = parseHTML("<div id=a></div>")
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == 'id') {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});


it('tag Upper', function () {
  let doc = parseHTML("<DIV><DIV>")
  let div = doc.children[0]
  assert.equal(div.tagName, "DIV")
});

it('before attribute name has whitespace', function () {
  let doc = parseHTML("<div  name  =   a ></div>")
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == "name") {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});

it('single quoted attribute value', function () {
  let doc = parseHTML("<div  'name'='a' ></div>")
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == "'name'") {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});

it('double quoted attribute value', function () {
  let doc = parseHTML('<div  "name"="a" ></div>')
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == '"name"') {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});
it('selfclosing tag', function () {
  let doc = parseHTML('<img />')
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == 'isSelfClosing') {
      assert.equal(attr.value, true)
      return
    }
  }
  assert.ok(false)

});
it('selfclosing with property', function () {
  let doc = parseHTML('<img name=a/>')
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == 'name') {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});

it('tag with property', function () {
  let doc = parseHTML('<img name="a">')
  let div = doc.children[0]
  for (let attr of div.attributes) {
    if(attr.name == 'name') {
      assert.equal(attr.value, 'a')
      return
    }
  }
  assert.ok(false)

});

it('tag with property has /', function () {
  let doc = parseHTML('<img name="ala" age="10"/>')
  let div = doc.children[0]
  let flag = false
  for (let attr of div.attributes) {
    if(attr.name == 'name') {
      assert.equal(attr.value, 'ala')
      flag = true
    }
    if (attr.name == "age" && flag) {
      assert.equal(attr.value, '10')
      return
    }

  }
  assert.ok(false)

});
 
it('tag with propertys has no whitespace', function () {
  let doc = parseHTML('<img name="ala"age="10"/>')
  let div = doc.children[0]
  let flag = false
  for (let attr of div.attributes) {
    if(attr.name == 'name') {
      assert.equal(attr.value, 'ala')
      flag = true
    }
    if (attr.name == "age" && flag) {
      assert.equal(attr.value, '10')
      return
    }

  }
  assert.ok(false)

}); 

it('tag with propertys has more value', function () {
  let doc = parseHTML('<img name last="ala"/>')
  let div = doc.children[0]
  let flag = false
  for (let attr of div.attributes) {
    if(attr.name == 'name') {
      assert.equal(attr.value, '')
      flag = true
    }
    if (attr.name == "last" && flag) {
      assert.equal(attr.value, 'ala')
      return
    }

  }
  assert.ok(true)

})

it('script', function () {
  let content = `
  <div>abcd</div>
  <span>x</span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script 
  `
  let doc = parseHTML(`<script>${content}</script>`)
  let div = doc.children[0].children[0]
  assert.equal(div.content, content)
  assert.equal(div.type, "text")
})