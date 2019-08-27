import React from  'react'
import {Dimensions, View, Animated, Easing, TouchableWithoutFeedback} from 'react-native'
import CircleTransition from './CircleTransition';

const { width, height } = Dimensions.get('window');
const size= Math.min(width,height)-1;
const screens = [{
    id: 0,
    bgcolor: '#698FB2'
  }, {
    id: 1,
    bgcolor: '#68B0B3'
  }, {
    id: 2,
    bgcolor: '#9B91BA'
  }]

export default class BubbleAnim extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _counter: 0,
            currentbg: screens[0].bgcolor
        };
    }
    
    onClick=()=>{
        const { _counter } = this.state;
        let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0;
        let newColor= screens[newCounter].bgcolor;
        this.setState({
            _counter: newCounter
        }, () => {
            this.circleTransition.start(newColor, this.changeColor.bind(this,newColor));
        });
    }
    changeColor(newColor){
        this.setState({
           currentbg: newColor 
        })
    }

    render(){
        return(
        <TouchableWithoutFeedback
            onPress={this.onClick}
        >
            <View
                style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' }}
            >
                <CircleTransition
                    ref={(circle)=>{ this.circleTransition=circle}}
                /> 
            </View>
        </TouchableWithoutFeedback>
       );
    }
}
