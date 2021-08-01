import Component from './Component.js'
export default class Sprite extends Component{
    constructor(src, w, h, posX, posY, tileCount=1, timeFrame=0){
        super()
        const timeStarted = new Date().getTime()
        this.state={
            img: null,
            width: w,
            height: h,
            X: posX,
            Y: posY,
            angle: 0,
            tileCount,
            currentTile: 0,
            timeFrame,
            timeStarted
        }
        this.loadAssets(src)
    }
    loadAssets(src){
        var img = new Image()
        img.src=src
        //console.log('Natural:' + img.naturalWidth)
        this.setState({img})
    }
    update(posX, posY, angle){
        const {tileCount, timeStarted, timeFrame} = this.state
        var currentTile = 0
        if(tileCount!=1){
            const now = new Date().getTime()
            currentTile = Math.floor((now - timeStarted)/timeFrame)%tileCount
            //console.log('Tile:' + currentTile)
        }
        this.setState({X: posX, Y: posY, currentTile, angle})
    }
    render(ctx){
        const {img, width, height, X, Y, currentTile, tileCount, angle} = this.state
        var size = img.naturalWidth/tileCount
        const offsetX = X+width/2
        const offsetY = Y+height/2
        //console.log(`img - ${currentTile*size}, ${0}, ${size}, ${img.naturalHeight}, ${X-offsetX}, ${Y-offsetY}, ${width}, ${height}`)
        ctx.translate(offsetX, offsetY)
        ctx.rotate(angle*Math.PI/180)
        ctx.drawImage(img, currentTile*size, 0, size, img.naturalHeight,  X-offsetX, Y-offsetY, width, height)
        ctx.rotate(-angle*Math.PI/180)
        ctx.translate(-offsetX, -offsetY)

    }
}