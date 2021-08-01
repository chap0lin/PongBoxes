import Component from './Component.js'

export default class Sound extends Component{
    constructor(src, loop){
        super()
        this.state = {
            audio: new Audio(src),
            loop
        }
    }
    play(){
        var {audio, loop} = this.state
        audio.loop = loop
        audio.play()
        this.setState({audio})
    }
    stop(){
        const {audio} = this.state
        audio.pause()
    }
    update(){
        
    }
    render(ctx){

    }
}