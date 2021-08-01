import Component from './components/Component.js'
export default class InputHandler extends Component{
    constructor(){
        super()
        if(!!InputHandler.instance){
            return InputHandler.instance
        }
        InputHandler.instance = this
        this.state = {
            observers: {
                "keyDown": [],
                "keyUp": [],
                "mouseMove": [],
                "mouseClick": [],
            },
        }
        
        document.addEventListener('keydown', this.handleKeydown.bind(this))
        document.addEventListener('keyup', this.handleKeyUp.bind(this))
        document.addEventListener('mousemove', this.handleMouseMove.bind(this))
        document.addEventListener('mousedown', this.handleMouseDown.bind(this))
    }
    isTopic(topic){
        return !!this.state.observers[topic]
    }
    subscribe(topic, name, observerFunction){
        if(this.isTopic(topic)){
            var {observers} = this.state
            observers[topic].push({name, observerFunction})
            this.setState({observers})
        }else{
            console.log(`The topic ${topic} does not exist!`)
        }
    }
    unsubscribe = (topic, functionToRemove) => {
        if(this.isTopic(topic)){
            var {observers} = this.state
            observers[topic] = observers[topic].filter(funct => funct.name!==functionToRemove)
            this.setState({observers})
        }else{
            console.log(`The topic ${topic} does not exist!`)
        }
    };
    notifyAll(topic, command){
        const functionList = this.state.observers[topic]
        functionList.forEach(observer => observer.observerFunction(command))
    }
    handleKeydown(evt){
        //console.log(`Key down event with key: ${evt.key}`)
        this.notifyAll("keyDown", evt.key)
    }
    handleKeyUp(evt){
        this.notifyAll("keyUp", evt.key)
    }
    handleMouseMove(evt){
        this.notifyAll("mouseMove", evt)
    }
    handleMouseDown(evt){
        this.notifyAll("mouseClick", evt)
    }
}