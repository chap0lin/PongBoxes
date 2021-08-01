import Component from '../../components/Component.js'
import Sprite from '../../components/sprite.js'

import ShadowMenu from '../../components/shadowMenu.js'
import InputHandler from '../../inputHandler.js'


export default class Credits extends Component{
    constructor(gameCallback){
        super()
        this.active = true
        const inputHandler = new InputHandler()
        inputHandler.subscribe('mouseClick','CreditsClick',(param)=>this.mouseClick(param))
        this.state = {
            background: new Sprite('./src/assets/img/capa.png', 1280, 720, 0, 0),
            shadow: new ShadowMenu(0.9),
            gameCallback,
            inputHandler,
        }
    }
    mouseClick(mouseObject){
        if(this.active){
            this.state.gameCallback({
                currentStage: 'Credits',
                nextStage: 'MainMenu'
            })
            this.active = false
        }    
    }
    update(){
    }
    render(ctx){
        const {background, shadow} = this.state
        if(!!background)background.render(ctx)
        
        ctx.fillStyle = "white"
        ctx.font = "40px Calibri"
        ctx.fillText('Desenvolvimento:', 200, 150)
        ctx.fillText('Colaboradores:', 200, 300)
        ctx.fillText('Música:', 200, 510)
        ctx.font = "60px Calibri"
        ctx.fillText('Carlos Rocha', 200, 220)
        ctx.fillText('Alexander Paschoaletto', 200, 370)
        ctx.fillText('Rodrigo Lima', 200, 430)
        ctx.fillText('Arthur Martins', 200, 580)

        if(!!shadow)shadow.render(ctx)

    }
    unload(){
        this.state.inputHandler.unsubscribe('mouseMove', 'ShadowMenuMove')
        this.state.inputHandler.unsubscribe('mouseClick','CreditsClick')
    }
}