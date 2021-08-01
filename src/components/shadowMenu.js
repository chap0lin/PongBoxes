import Component from './Component.js'
import InputHandler from '../inputHandler.js'

export default class ShadowMenu extends Component{
    constructor(alpha){
        super()
        this.state = {
            x: 640,
            y:360,
            alpha
        }
        const inputHandler = new InputHandler()
        inputHandler.subscribe('mouseMove', 'ShadowMenuMove',(param)=>this.moveFocus(param))
    }
    moveFocus(mouseObject){
        const x = mouseObject.offsetX
        const y = mouseObject.offsetY
        this.setState({x, y})
    }
    update(){
        
    }
    render(ctx){
        const {x, y, alpha} = this.state
        var grd = ctx.createRadialGradient(x, y, 80, x, y, 300)
        grd.addColorStop(0, "transparent");
        grd.addColorStop(1, `rgba(0,0,0,${alpha})`);
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, 1280,720)
    }
}