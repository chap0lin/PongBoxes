import Component from '../../components/Component.js'
import InputHandler from '../../inputHandler.js'
import Tiles from '../../components/tiles.js'
import Player from '../../components/player.js'
import BlackBox from '../../components/blackBox.js'
import Sound from '../../components/sound.js'
import Sprite from '../../components/sprite.js'

const STEP = 5

export default class ThirdLevel extends Component{
    constructor(gameCallback){
        super()
        this.active = true
        var inputHandler = new InputHandler()
        this.state = {
            inputHandler,
            backgroundImage: new Sprite('./src/assets/img/boss3.png', 1280, 720, 0, 0),
            positionX: 0,
            map: [],
            tiles: null,
            xv:0,
            yv:0,
            x:80,
            y:1440,
            playerSize: 40,
            tileSize: 60,
            timer:null,
            textTimer: null,
            gameCallback,
            prologue:true,
            epilogue:false,
        }
        inputHandler.subscribe('keyDown','ThirdLevelDown',(key)=>this.moveCamera('down', key))
        inputHandler.subscribe('keyUp','ThirdLevelUp', (key)=>this.moveCamera('up', key))
        this.load()
    }
    load(){
        const {playerSize, tileSize} = this.state
        var map = [
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 17, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 13, 6, 8, 7, 5, 8, 3, 8, 10, 8, 7, 6, 8, 8, 13, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 15, 4, 14, 8, 8, 10, 7, 0, 4, 2, 3, 8, 8, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 6, 15, 6, 8, 8, 15, 12, 0, 0, 14, 7, 6, 13, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 15, 2, 7, 14, 8, 10, 8, 8, 15, 2, 13, 0, 14, 7, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 7, 0, 14, 8, 7, 0, 5, 7, 4, 0, 6, 15, 6, 3, 15, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 12, 0, 2, 7, 6, 15, 14, 8, 3, 15, 14, 15, 5, 3, 8, 13, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 3, 15, 12, 14, 13, 6, 7, 6, 8, 8, 8, 8, 7, 6, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 8, 7, 4, 6, 15, 14, 15, 6, 7, 6, 7, 14, 15, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 15, 4, 0, 14, 11, 5, 10, 7, 0, 0, 12, 0, 6, 8, 15, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 15, 14, 8, 15, 6, 15, 14, 15, 14, 10, 15, 0, 6, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 3, 7, 4, 6, 7, 0, 6, 8, 7, 5, 3, 7, 2, 15, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 5, 3, 3, 15, 14, 11, 2, 7, 14, 8, 8, 15, 14, 7, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 8, 13, 6, 10, 15, 12, 14, 7, 6, 8, 8, 7, 0, 12, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 12, 2, 8, 7, 12, 0, 4, 6, 7, 12, 14, 8, 13, 14, 3, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 11, 4, 0, 6, 11, 0, 0,14, 8, 8, 7, 6, 8, 7, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 12, 14, 15, 14, 15, 14, 15, 14, 7, 5, 8, 3, 15, 5, 3, 15, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]

          ]

        var tiles = new Tiles('./src/assets/img/tilesLab2.png', map, tileSize,tileSize, 8)
        var player = new Player(playerSize)
        var blackBox = new BlackBox(map.length, tileSize, 11, 360)
        this.setState({tiles, map, player, blackBox})
    }
    prologue(ctx){
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(0,0,1280,720)
        ctx.fillStyle = "white"
        ctx.font = "30px Calibri"
        ctx.fillText('Todos que estavam abaixo de mim na pirâmide foram derrotados.', 60, 90)
        ctx.fillText('Minha pirâmide está ruindo, mas como o mais privilegiado por ela', 60, 140)
        ctx.fillText('em toda a história, vou defendê-la com todas as minhas forças!', 60, 180)
        ctx.fillText('Todos estes anos contemplando a ignorância de seres supostamente', 60, 230)
        ctx.fillText('inteligentes  deste planeta foram por água abaixo. Que você se vire', 60, 270)
        ctx.fillText('para pilotar nossa nave e espero que não encontre nosso planeta natal.', 60, 310)

        ctx.fillText('Pressione qualquer tecla para começar!', 580, 640)
    }
    epilogue(ctx){
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(0,0,1280,720)
        ctx.fillStyle = "white"
        ctx.font = "30px Calibri"
        ctx.fillText('Parabéns, Graças a sua ajuda Rinno D. conseguiu fugir desta quarentena!', 60, 90)
        ctx.fillText('Pressione qualquer tecla para continuar!', 580, 640)
    }
    moveCamera(evt, key){
        //console.log('Fase 3 Movement')
        var {xv, yv, prologue, epilogue} = this.state
        if(this.active && epilogue && evt=='down'){
            this.state.gameCallback({
                currentStage: 'ThirdLevel',
                nextStage: 'Credits'
            })
            this.active = false
        }
        if(prologue && evt=='down'){
            prologue = false
        }else{
            switch(key){
                case 'ArrowRight':
                    xv=evt=='down'?1:0
                    break
                case 'ArrowLeft':
                    xv=evt=='down'?-1:0
                    break
                case 'ArrowUp':
                    yv=evt=='down'?-1:0
                    break
                case 'ArrowDown':
                    yv=evt=='down'?1:0
                    break
                case 'f':
                    evt=='down'&&this.Flash()
                    break
                case ' ':
                    evt=='down'&&this.teleportPlayer()
                    break

            }
        }
        this.setState({xv, yv, prologue})
    }
    Flash(){
        const {blackBox} = this.state
        blackBox.highlight()
    }
    teleportPlayer(){
        var {x, y, tileSize} = this.state
        const incrementX = Math.floor(Math.random()*3) - 1
        const incrementY = Math.floor(Math.random()*3) - 1
        x+= incrementX*tileSize
        y+= incrementY*tileSize
        this.setState({x,y})
    }
    findTile(x, y){
        const {playerSize, tileSize, map} = this.state
        const mazeX = Math.floor((x)/tileSize)
        const mazeY = Math.floor((y)/tileSize)
        const type = map[mazeY][mazeX]
        //console.log('Tile:' + `mX:${mazeX}, my:${mazeY} - ${type}`)
        //console.log(type)
        return(
            {mazeX, mazeY, type}
        )
    }
    movePlayer2(xv, yv){
        var {x, y} = this.state
        const mazeX = (x + 640)
        const mazeY = (y + 360)
        //console.log(`Tx:${mazeX}, Ty:${mazeY}`)
        y += yv*(STEP*2)
        x += xv*(STEP*2)
        return([ x, y ])
    }
    movePlayer(xv, yv){
        var {x, y, playerSize, tileSize, map} = this.state
        const mazeX = (x + 640)
        const mazeY = (y + 360)
        //console.log(`Tx:${mazeX}, Ty:${mazeY} - 11x(${tileSize*11} , ${(map.length - 11)*tileSize})`)
        if(yv==-1){ //UP
            if(mazeY%tileSize<=playerSize/2){
                if((mazeX%tileSize<=playerSize/4 || mazeX%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize) ){
                    //console.log('WallJump1')
                }else{
                    const tile = this.findTile(mazeX, mazeY-tileSize).type
                    if(tile==3 || tile==5 || tile==8 || tile==12 || tile==13 || tile==14 || tile==15 || tile==9){
                        //console.log('NOT PASSSS')
                    }else{
                        y += yv*STEP
                    }
                }
            }else{
                y += yv*STEP
            }
        }else if(yv==1){
            if(mazeY%tileSize>=tileSize-playerSize/2){
                if((mazeX%tileSize<=playerSize/4 || mazeX%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize)){
                    //console.log('WallJump2')
                }else{
                    const tile = this.findTile(mazeX, mazeY+tileSize).type
                    if(tile==4 || tile==5 || tile==6 || tile==7 || tile==8 || tile==10 || tile==13 || tile==9){
                        //console.log('NOT PASSSS')
                    }else{
                        y += yv*STEP
                    }
                }
            }else{
                y += yv*STEP
            }
        }
        if(xv==1){
            if(mazeX%tileSize>=tileSize-playerSize/2){
                if((mazeY%tileSize<=playerSize/4 || mazeY%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize)){
                    //console.log('WallJump3')
                }else{
                    const tile = this.findTile(mazeX+tileSize, mazeY).type
                    if(tile==0 || tile==2 || tile==4 || tile==5 || tile==6 || tile==9 || tile==12 || tile==14){
                        //console.log('NOT PASSSS')
                    }else{
                        x += xv*STEP
                    }
                }
            }else{
                x += xv*STEP
            }
        }else if(xv==-1){
            if(mazeX%tileSize<=playerSize/2){
                if((mazeY%tileSize<=playerSize/4 || mazeY%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11 && mazeY<= (map.length-11)*tileSize)){
                    //console.log('WallJump4')
                }else{
                    const tile = this.findTile(mazeX-tileSize, mazeY).type
                    if(tile==0 || tile==4 || tile==7 || tile==9 || tile==11 || tile==12 || tile==13 || tile==15){
                        //console.log('NOT PASSSS')
                    }else{
                        x += xv*STEP
                    }
                }
            }else{
                x += xv*STEP
            }
        }
        return([ x, y ])
    }
    update(){
        var {player, tiles, blackBox, x, xv, y, yv, timer, textTimer} = this.state;
        //var now  = new Date().getTime()
        if(x>=420 && x<= 480 && y>=0 && y<=60){
            this.setState({epilogue:true})
            return
        }
        if(y<1280 && timer==null){
            timer = new Date().getTime()
        }
        if(timer!=null){
            var now  = new Date().getTime()
            //console.log(`Time: ${((now-timer)/1000).toFixed(1)}s`)
            textTimer = `Você tem ${(30-(now-timer)/1000).toFixed(1)}s para atravessar o labirinto!`
            if(30-(now-timer)/1000<=0){
                textTimer = `Você tem 30s para atravessar o labirinto!`
                timer = now
                x = 80
                y = 1440
                this.setState({x, y, timer, textTimer})
                return
            }
        }
        if((y>1280 || y<300 ) && timer!=null){
            timer = null
            textTimer = null
        }
        [x, y] = this.movePlayer(xv, yv)
        //console.log(`X:${x}, Y:${y}`)

        if(!!tiles)tiles.update(x, y)

        blackBox.update(1, y)
        player.update(xv, yv)
        
        
        this.setState({x, y, timer, textTimer})
    }
    render(ctx){
        const {prologue,epilogue,tiles, blackBox, player, timer, textTimer, backgroundImage} = this.state
        if(epilogue){
            if(!!backgroundImage)backgroundImage.render(ctx)
            this.epilogue(ctx)
        }else if(prologue){
            if(!!backgroundImage)backgroundImage.render(ctx)
            this.prologue(ctx)
        }else{
            if(!!tiles)tiles.render(ctx)
            if(!!blackBox)blackBox.render(ctx)
            if(!!player)player.render(ctx)
            if(timer!=null){
                ctx.fillStyle = "white"
                ctx.font = "30px Calibri"
                ctx.fillText(`${textTimer}`, 60, 90)
            }
        }
    }
    unload(){
        //console.log('Unsubscribing Stage 3')
        this.state.inputHandler.unsubscribe('keyDown','ThirdLevelDown')
        this.state.inputHandler.unsubscribe('keyUp','ThirdLevelUp')
    }
}