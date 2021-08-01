import Component from '../../components/Component.js'
import InputHandler from '../../inputHandler.js'
import Tiles from '../../components/tiles.js'
import Player from '../../components/player.js'
import BlackBox from '../../components/blackBox.js'
import Thunder from '../../components/thunder.js'
import Sound from '../../components/sound.js'
import Sprite from '../../components/sprite.js'

const STEP = 5

export default class FistLevel extends Component{
    constructor(gameCallback){
        super()
        this.active = true
        var inputHandler = new InputHandler()
        const thunderTimer = new Date().getTime()
        this.state = {
            inputHandler,
            positionX: 0,
            map: [],
            tiles: null,
            xv:0,
            yv:0,
            x:80,
            y:1680,
            playerSize: 40,
            tileSize: 60,
            thunder: null,
            thunderTimer,
            prologue: true,
            epilogue: false,
            gameCallback,
            backgroundImage: new Sprite('./src/assets/img/boss1.png', 1280, 720, 0, 0)
        }
        inputHandler.subscribe('keyDown','FirstLevelDown',(key)=>this.moveCamera('down', key))
        inputHandler.subscribe('keyUp','FirstLevelUp', (key)=>this.moveCamera('up', key))
        this.load()
    }
    load(){
        const {playerSize, tileSize} = this.state
        const map = [
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 8, 7, 6, 7, 6, 8, 8, 8, 3, 8, 7, 5, 10, 8, 7, 6, 8, 8, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14, 7, 0, 0, 14, 3, 8, 7, 6, 8, 7, 14, 7, 14, 13, 14, 15, 6, 8, 15, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 5, 11, 0, 0, 6, 7, 5, 11, 14, 7, 0, 4, 14, 8, 10, 8, 7, 0, 6, 13, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 15, 14, 15, 0, 0, 6, 15, 6, 15, 12, 2, 8, 7, 14, 7, 14, 15, 14, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 7, 4, 0, 0, 0, 6, 15, 6, 7, 0, 6, 15, 4, 2, 7, 6, 7, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 15, 2, 15, 0, 0, 0, 14, 8, 15, 14, 15, 0, 6, 15, 12, 2, 15, 14, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 12, 6, 15, 6, 15, 14, 15, 6, 10, 7, 6, 7, 2, 15, 6, 8, 15, 6, 7, 12, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 15, 4, 14, 7, 6, 8, 15, 0, 0, 0, 0, 14, 8, 3, 7, 5, 15, 14, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 15, 6, 15, 12, 6, 7, 0, 2, 15, 0, 6, 8, 7, 14, 8, 7, 5, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14, 11, 5, 3, 8, 10, 15, 0, 0, 0, 5, 15,14, 7, 0, 6, 7, 2, 7, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 15, 6, 8, 8, 15, 4, 0, 12, 14, 8, 7,6, 11, 0, 0, 14, 15, 12, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 6, 15, 5, 8, 10, 15, 14, 7, 6, 8, 15,12, 0, 0, 0, 6, 8, 8, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 14, 8, 8, 7, 14, 7, 6, 15, 14, 8, 10, 8, 15, 0, 14, 3, 8, 7, 12, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 7, 5, 7, 14, 8, 15, 0, 6, 8, 7, 0, 6, 13, 14, 8, 8, 7, 14, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 14, 8, 15, 6, 7, 4, 0, 0, 4, 0, 0, 2, 8, 7, 6, 7, 14, 8, 15, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14, 7, 6, 7, 0, 14, 15, 0, 14, 15, 14, 11, 0, 5, 3, 15, 0, 5, 8, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 15, 0, 14, 15, 4, 6, 11, 5, 8, 10, 15, 14, 7, 6, 7, 14, 7, 6, 11, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 4, 0, 5, 7, 0, 0, 12, 6, 7, 2, 7, 5, 11, 0, 2, 8, 11, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 2, 11, 6, 3, 15, 14, 7, 0, 0, 12, 0, 6, 15, 0, 0, 6, 15, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14, 15, 14, 3, 8, 8, 13, 14, 15, 14, 7, 14, 15, 5, 15, 12, 14, 8, 15, 12, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
          ]      
        var tiles = new Tiles('./src/assets/img/tilesLab2.png', map, tileSize,tileSize, 8)
        var player = new Player(playerSize)
        var blackBox = new BlackBox(map.length, tileSize, 11, 360)
        var music = new Sound('./src/assets/audio/music.mp3', true)
        music.play()
        this.setState({tiles, map, player, blackBox, music})
    }
    prologue(ctx){
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(0,0,1280,720)
        ctx.fillStyle = "white"
        ctx.font = "30px Calibri"
        ctx.fillText('Rinno D. você ousou entrar na pirâmide minha e dos meus irmãos para tentar pegar nossa', 60, 90)
        ctx.fillText('espaçonave e fugir da quarentena!', 60, 130)
        ctx.fillText('Fechei o caminho que você entrou e agora eu vou te derrotar por que o seu sacrifício', 60, 180)
        ctx.fillText('vai me permitir chegar a niveis mais altos da pirâmide.', 60, 220)
        ctx.fillText('Como todos sabemos, as pirâmides só poderiam ser construídas por nós aliens e a única', 60, 270)
        ctx.fillText('forma de escapar delas é não entrando ou chegando na posição mais alta.', 60, 310)
        ctx.fillStyle = "white"
        ctx.font = "30px Calibri"
        ctx.fillText('Pressione qualquer tecla para começar!', 580, 640)
    }
    epilogue(ctx){
        ctx.fillStyle = "rgba(0,0,0,0.8)"
        ctx.fillRect(0,0,1280,720)
        ctx.fillStyle = "white"
        ctx.font = "30px Calibri"
        ctx.fillText('Oh não, você me derrotou! Como recompensa você liberou o poder do raio!', 60, 90)
        ctx.fillText('Pressione', 60, 180) 
        ctx.fillText('no próximo labirinto para usar o poder do raio!', 60, 340)
        ctx.fillText('Pressione qualquer tecla para continuar!', 580, 640)
        ctx.font = "60px Calibri"
        ctx.fillText('F', 60, 270) 
    }
    moveCamera(evt, key){
        var {xv, yv, prologue, epilogue} = this.state
        //console.log('Fase 1 Movement')
        if(this.active && epilogue && evt=='down'){
            this.state.gameCallback({
                currentStage: 'FistLevel',
                nextStage: 'SecondLevel'
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
                case 't':
                    evt=='down'&&this.createThunder()
                    break
                case 'm':
                    evt=='down'&&this.state.music.stop()
                    break
            }
        }
        this.setState({xv, yv, prologue})
    }
    createThunder(){
        var { blackBox, map, x, y, tileSize } = this.state
        const tileDistance = 2*tileSize
        const randomX = x+640-tileDistance + Math.floor(Math.random()*tileDistance*2)
        const randomY = y+360-tileDistance + Math.floor(Math.random()*tileDistance*2)
        const thunder = new Thunder(randomX, randomY, x, y, blackBox)
        return thunder
    }
    findTile(x, y){
        const {tileSize, map} = this.state
        const mazeX = Math.floor((x)/tileSize)
        const mazeY = Math.floor((y)/tileSize)
        const type = map[mazeY][mazeX]
        return(
            {mazeX, mazeY, type}
        )
    }
    movePlayer2(xv, yv){
        var {x, y} = this.state
        const mazeX = (x + 640)
        const mazeY = (y + 360)
        y += yv*(STEP*2)
        x += xv*(STEP*2)
        return([ x, y ])
    }
    movePlayer(xv, yv){
        var {x, y, playerSize, tileSize, map} = this.state
        const mazeX = (x + 640)
        const mazeY = (y + 360)
        if(yv==-1){ //UP
            if(mazeY%tileSize<=playerSize/2){
                if((mazeX%tileSize<=playerSize/4 || mazeX%tileSize>=tileSize-playerSize/4) && (mazeY >= tileSize*11) && (mazeY<= (map.length-11)*tileSize) ){
                }else{
                    const tile = this.findTile(mazeX, mazeY-tileSize).type
                    if(tile==3 || tile==5 || tile==8 || tile==12 || tile==13 || tile==14 || tile==15 || tile==9){
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
                }else{
                    const tile = this.findTile(mazeX, mazeY+tileSize).type
                    if(tile==4 || tile==5 || tile==6 || tile==7 || tile==8 || tile==10 || tile==13 || tile==9){
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
                }else{
                    const tile = this.findTile(mazeX+tileSize, mazeY).type
                    if(tile==0 || tile==2 || tile==4 || tile==5 || tile==6 || tile==9 || tile==12 || tile==14){
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
                }else{
                    const tile = this.findTile(mazeX-tileSize, mazeY).type
                    if(tile==0 || tile==4 || tile==7 || tile==9 || tile==11 || tile==12 || tile==13 || tile==15){
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
        var {player, tiles, blackBox, x, xv, y, yv, thunder, thunderTimer} = this.state;
        var now  = new Date().getTime()
        if(x>=560 && x<= 620 && y>=0 && y<=60){
            this.setState({epilogue:true})
            return
        }
        if(now-thunderTimer > 2000 && y>270 && y<1500){
            thunderTimer = now
            thunder = this.createThunder()
        }
        var playerHitted = false
        if(!!thunder && thunder.hasExpired()){
            thunder = null
        }else if(!!thunder && !thunder.hasExpired()){
            playerHitted = thunder.update(x,y)
        }
        if(playerHitted){
            x = 80
            y = 1680
        }else{
            [x, y] = this.movePlayer(xv, yv)
        }
        if(!!tiles)tiles.update(x, y)

        blackBox.update(1, y)
        player.update(xv, yv)
        
        
        this.setState({x, y, thunder, thunderTimer})
    }
    render(ctx){
        const {prologue,epilogue, tiles, blackBox, player, thunder, backgroundImage} = this.state
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
            if(!!thunder)thunder.render(ctx)
        }
    }
    unload(){
        //console.log('Unsubscribing Stage 1')
        this.state.inputHandler.unsubscribe('keyDown','FirstLevelDown')
        this.state.inputHandler.unsubscribe('keyUp','FirstLevelUp')
    }
}