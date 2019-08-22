import React,{Component} from 'react'
import {Animated,Easing} from 'react-native'

export default class BackUpView extends Component{
    constructor(props){
        super(props);
        this.state={
            backupAnim: new Animated.ValueXY({x:20,y:50})
        };
    }
    componentDidMount(){
        Animated.timing(this.state.backupAnim,{
            toValue:{x:80,y:50},
            easing: Easing.back(8),
            duration:6000,
        }).start();
    }
    render(){
        let {backupAnim}= this.state;
        return(
            <Animated.View 
                style={[this.props.style, backupAnim.getLayout()]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}