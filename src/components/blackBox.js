import Component from './Component.js'

export default class BlackBox extends Component{
    constructor(mapLenght, tileSize, margin, cameraOffset){
        super()
        this.state = {
            alpha: 1,
            lanternSize: 120,
            min: (mapLenght-margin)*tileSize - cameraOffset,
            max: (mapLenght-margin+5)*tileSize -cameraOffset,
            hightlightTimer: null
        }
    }
    highlight(){
        var {hightlightTimer} = this.state
        hightlightTimer = new Date().getTime()
        this.setState({alpha: 0, hightlightTimer})
    }
    update(lantern, yLevel){
        var {alpha, max, min, hightlightTimer} = this.state
        //console.log('Ylevel:' + yLevel + `min:${min}, max:${max}`)
        const now = new Date().getTime()
        if(now-hightlightTimer>300){
            alpha = yLevel>min?yLevel>max?0:(1-(yLevel-min)/300):yLevel>=0?yLevel>300?1:(yLevel)/300:0
        }
        this.setState({alpha})
    }
    render(ctx){
        const {alpha} = this.state
        var grd = ctx.createRadialGradient(640, 360, 20, 640, 360, 120)
        grd.addColorStop(0, "transparent");
        grd.addColorStop(1, `rgba(0,0,0,${alpha})`);
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, 1280,720)
    }
}