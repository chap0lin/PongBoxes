import Component from './Component.js'
// import Sprite from './sprite.js'
// import Sound from './sound.js'

export default class Bar extends Component{
    constructor(x1, y1, x2, y2, color){
        super()
        this.state={
            //sprite: new Sprite('./src/assets/img/marker.png', 100, 100, posX, posY),
            //sound: new Sound('./src/assets/audio/thunder.mp3'),
            x1,
            x2,
            y1,
            y2,
            color
        }

    }
    update(){
    }
    angle(){
        const {x1, x2, y1, y2} = this.state
        return 90-Math.atan2(y2-y1, x2-x1)*180/Math.PI
    }
    hitbox(){
        const {x1, x2, y1, y2} = this.state
        return {x1, y1, x2, y2}
    }
    equation(){
        const {x1, x2, y1, y2} = this.state
        const a = y1-y2
        const b = x2-x1
        const c = x1*y2 - x2*y1
        return {a, b, c}
    }
    render(ctx){
        const {x1, x2, y1, y2, color} = this.state
        ctx.strokeStyle = color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        //sprite.render(ctx)
    }
}