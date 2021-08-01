console.log('Main.js')
import Game from './src/game.js'
import InputHandler from './src/inputHandler.js'

let canv = document.getElementById('gameScreen');
let ctx = canv.getContext("2d");
function run(){
    game.update()
}

function render(){
    game.render(ctx)
    requestAnimationFrame(render)
}

new InputHandler()

const game = new Game(canv);
setInterval(run, 1000/300);
requestAnimationFrame(render)