import Component from './components/Component.js'
import TestStage from './stages/TestStage/index.js'
import MainMenu from './stages/mainMenu/index.js'
import FirstLevel from './stages/firstLevel/index.js'
import Credits from './stages/credits/index.js'

export default class Game extends Component{
    constructor(canv){
        super()
        this.state = {
            
        }
        this.stage = new TestStage(this.changeState.bind(this))
    }
    changeState(obj){
        this.stage.unload()
        //console.log('Changing Level:' + `${obj.nextStage}`)
        switch(obj.nextStage){
            case 'FirstLevel':
                this.stage = new FirstLevel(this.changeState.bind(this))
                break
            case 'SecondLevel':
                this.stage = new SecondLevel(this.changeState.bind(this))
                break
            case 'ThirdLevel':
                this.stage = new ThirdLevel(this.changeState.bind(this))
                break
            case 'MainMenu':
                this.stage = new MainMenu(this.changeState.bind(this))
                break
            case 'Credits':
                this.stage = new Credits(this.changeState.bind(this))
                break
        }
    }
    update(){
        this.stage.update()
    }
    render(ctx){
        this.stage.render(ctx)
    }
}