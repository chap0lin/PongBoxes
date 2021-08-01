import Component from '../../components/Component.js'
import Sprite from '../../components/sprite.js'
import ShadowMenu from '../../components/shadowMenu.js'
import InputHandler from '../../inputHandler.js'

export default class MainMenu extends Component{
    constructor(gameCallback){
        super()
        this.active = true
        const inputHandler = new InputHandler()
        inputHandler.subscribe('mouseClick','MainMenuClick',(param)=>this.mouseClick(param))
        this.state = {
            background: new Sprite('./src/assets/img/capa.png', 1280, 720, 0, 0),
            shadow: new ShadowMenu(0.8),
            gameCallback,
            inputHandler
        }
        
    }
    mouseClick(mouseObject){
        const { offsetX, offsetY} = mouseObject
        //console.log('click' + offsetX+ ',' + offsetY)
        if(this.active && offsetX>=540 && offsetX<=665.8 && offsetY>=480 && offsetY<=540){
            //console.log('Clicou no botao')
            this.state.gameCallback({
                currentStage: 'MainMenu',
                nextStage: 'FirstLevel'
            })
        }else if(this.active && offsetX>=540 && offsetX<=673.8 && offsetY>=560 && offsetY<=600){
            this.state.gameCallback({
                currentStage: 'MainMenu',
                nextStage: 'Credits'
            })
        }
    }
    update(){
        const {background, shadow} = this.state
        if(!!background)background.update(0,0,0)
    }
    render(ctx){
        const {background, shadow} = this.state
        if(!!background)background.render(ctx)
        if(!!shadow)shadow.render(ctx)
        ctx.fillStyle = "white"
        ctx.font = "60px Calibri"
        ctx.fillText('Rinno D.', 540, 440)
        ctx.fillText('PLAY', 580, 540)
        ctx.font = "40px Calibri"
        ctx.fillText('Credits', 580, 600)

    }
    unload(){
        this.state.inputHandler.unsubscribe('mouseMove', 'ShadowMenuMove')
        this.state.inputHandler.unsubscribe('mouseClick','MainMenuClick')
        this.active=false
    }
}