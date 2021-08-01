import Component from './Component.js'
import Sprite from './sprite.js'
import Sound from './sound.js'

export default class Thunder extends Component{
    constructor(posX, posY, playerX, playerY, blackbox){
        super()
        const timeStarted = new Date().getTime()
        this.state={
            state: 'marker',
            sprite: new Sprite('./src/assets/img/marker.png', 100, 100, posX, posY),
            sound: new Sound('./src/assets/audio/thunder.mp3'),
            blackbox,
            expired:false,
            timeStarted,
            posX,
            posY,
            secondSprite: new Sprite('./src/assets/img/thunder.png', 100, 100, posX, posY, 6, 166)
        }

    }
    hasExpired(){
        const {expired} = this.state
        return expired
    }
    update(playerX, playerY){
        var {sprite, timeStarted, blackbox, posX, posY, secondSprite, state} = this.state
        var playerHitted = false
        const now = new Date().getTime()
        var timePassed = Math.floor((now - timeStarted)/1000)
        //console.log(`Player: ${playerX},${playerY} - Thun: ${posX}, ${posY}`)
        if(timePassed==1){
            sprite = secondSprite
            state=='marker'&&blackbox.highlight()
            state = 'thunder'
            if(posX-playerX-640>-100 && posX-playerX-640<0 && posY-playerY-360>-100 && posY-playerY-360<0){
                playerHitted = true
            }
        }
        var expired = timePassed>1
        
        sprite.update(posX - playerX, posY- playerY, 0)
        this.setState({expired, sprite, state})
        return playerHitted
    }
    render(ctx){
        const {sprite, sound, state} = this.state
        if(state == 'thunder'){
            sound.play()
        }
        sprite.render(ctx)
    }
}