import Component from '../../components/Component.js'
import InputHandler from '../../inputHandler.js'
import Bar from '../../components/bar.js'

const STEP = 1
const RAIO = 30
export default class TestStage extends Component{
    constructor(){
        super()
        this.state = {
            xPosition: 100,
            yPosition: 200,
            velocityY: STEP,
            velocityX: 0,
            justCollided: new Date().getTime(),
            currentTime: new Date().getTime()
        }
        var inputHandler = new InputHandler()
        inputHandler.subscribe('keyDown', 'testlevelDOWN',(key)=>this.moveCamera('down', key))
        inputHandler.subscribe('keyUp', 'testlevelUP',(key)=>this.moveCamera('up', key))
        console.log(this.state.velocityY)
        this.load()
    }
    load(){
        const barArray = []
        barArray.push(new Bar(0,0,300,0, 'yellow'))
        barArray.push(new Bar(0,0,0,720, 'blue'))
        barArray.push(new Bar(300,0,300,720, 'blue'))
        barArray.push(new Bar(0, 720, 300, 720, 'yellow'))
        barArray.push(new Bar(50, 400, 150, 450, 'green'))
        // barArray.push(new Bar(50, 410, 150, 460, 'green'))
        // barArray.push(new Bar(50, 400, 50, 410, 'green'))
        // barArray.push(new Bar(150, 450, 150, 460, 'green'))

        console.log('angle', 90 - barArray[0].angle())// pi  180  var  ?   = var * 180/Math.PI
        this.setState({barArray})
    }
    moveCamera(evt, key){
        this.setState({yPosition:this.state.yPosition+10})
    }
    findTile(x, y){
        
    }
    movePlayer(xv, yv){
    }
    update(){
        var {yPosition, xPosition, currentTime, velocityY, velocityX, justCollided} = this.state

        var {angle, collided} = this.hasCollided()
        if(collided){
            const {velX, velY} = this.updateVelocities(angle)
            velocityX = velX
            velocityY = velY
        }
        yPosition += velocityY
        xPosition += velocityX

        this.setState({yPosition, xPosition, velocityX, velocityY})
    }
    calcDelta(xc,yc,r,a,b,c){
        if(a!=0){
            var delta = (2*b*xc/a + 2*b*c/(a**2) - 2*yc)**2 -4*(1+(b/a)**2)*(xc**2 + (c/a)**2 + 2*c*xc/a + yc**2 - r**2)
        }else{
            var delta = Math.abs(yc+(c/b))<RAIO?1:-1
        }
        return delta
    }
    hasCollided(){
        var {xPosition: x, yPosition: y, velocityY, velocityX, barArray} = this.state
        var collided = false
        var angle = 0
        barArray.forEach(bar=>{
            const {a,b,c} = bar.equation()
            const {x1, y1, x2, y2} = bar.hitbox()
            if(!collided && x>x1-RAIO && x<x2+RAIO && y>y1-RAIO && y<y2+RAIO && this.calcDelta(x, y, RAIO, a, b, c)>=0){
                collided = true
                angle = 2*bar.angle() + Math.atan2(velocityY,velocityX)*180/Math.PI - 180
                console.log('colidiu - angle ', angle)
            }
        })
        return {collided, angle}
    }
    updateVelocities(angle){
        return{
            velX: STEP*Math.cos(angle*Math.PI/180),
            velY: -STEP*Math.sin(angle*Math.PI/180)
        }
    }
    

    render(ctx){
        const {xPosition, yPosition, barArray} = this.state
        ctx.fillStyle = "white"
        ctx.fillRect(0,0,1280,720)
        
        ctx.fillStyle = "red"
        ctx.beginPath();
        ctx.arc(xPosition, yPosition, RAIO, 0, 2 * Math.PI);
        ctx.fill();
        barArray.forEach(bar=>{
            bar.render(ctx)
        })
    }
    unload(){
        
    }
}