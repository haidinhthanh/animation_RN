import React from 'react'
import {Animated} from 'react-native'

export default class ImageTransition extends React.Component{
    render(){
        return(
            <Animated.Image
                source={this.state.currentimg}
                style={{width: 100, height:100, tintColor:'white'}}
            >
                
            </Animated.Image>
        );
    }
}