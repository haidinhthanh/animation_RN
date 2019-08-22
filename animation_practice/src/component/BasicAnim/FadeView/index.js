import React,{Component} from 'react'
import {View,Animated,} from 'react-native'

export default class FadeView extends Component{
    constructor(props){
        super(props);
        this.state={
            fadeAnim: new Animated.Value(0),
        }
    }
    componentDidMount(){
        Animated.timing(this.state.fadeAnim,{
            duration: 10000,
            toValue:1,
        }).start();
    }
    render(){
        let {fadeAnim}= this.state;
        return(
            <Animated.View
                style={{...this.props.style, opacity: fadeAnim }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
