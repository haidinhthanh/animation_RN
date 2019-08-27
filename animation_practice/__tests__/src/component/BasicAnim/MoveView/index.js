import React,{Component} from 'react'
import {Animated} from 'react-native'

export default class MoveView extends Component{
    constructor(props){
        super(props);
        this.state={
            moveAnim: new Animated.ValueXY({
                x:0,
                y:40 
            })
        }
    }
    componentDidMount(){
        Animated.spring()
    }
    render(){
        let {moveAnim} = this.state;
        return(
            <Animated.View
                style={[this.props.style,moveAnim.getLayout()]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}