var tty = require('tty')
var ttys = require('ttys')

var stdin = ttys.stdin
var stdout = ttys.stdout

stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );

function up(n = 0){
  
  process.stdout.write('\033['+ n + 'A')
  left()
}
function down(n = 0){
  process.stdout.write('\033['+ n + 'B')
  left()
}
function left(n = 1){
  process.stdout.write('\033['+ n + 'D')
}
function right(n = 1){
  process.stdout.write('\033['+ n + 'C')
}

// on any data into stdin
void async function dataEvent () {
  stdout.write('which framework do you want to use?\n')
  let choices = ['vue', 'react', 'angular']
  let answer = await select(choices)
  stdout.write('you choosed: '+ answer)
  process.exit()
}()


function select(choices){
  return new Promise (resolve => {
    let selected = 0
    for(let i=0;i<choices.length;i++) {
      let choice = choices[i]
      if (selected == i) {
        stdout.write('[x]' + choice + '\n')
      } else {
        stdout.write('[ ]' + choice + '\n')
      }
      
    }
    up(choices.length)
    right()

    stdin.on( 'data', ( key )=>{

      if (key == '\u001B\u005B\u0041') {
        if (selected > 0) {
          
          process.stdout.write(' ')

          selected --
          up()
          
          process.stdout.write('x')
  
          left()
        }
        
    }

    if (key == '\u001B\u005B\u0042') {
      if (selected < choices.length -1) {
        process.stdout.write(' ')        
        selected++
        down()
        
        
        process.stdout.write('x')

        left()
      }
    }
    if (key == '\u001B\u005B\u0044') {
        // stdout.write('left'); 
    }
    if (key == '\u001B\u005B\u0043') {
      // stdout.write('right'); 
    }
        
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
      process.exit();
    }
    if(key == '\r') {
      down(choices.length - selected)
      resolve(choices[selected])
    }
    })

    
  })


}
