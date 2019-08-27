import React,{Component} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'
import images from '../../../asset/images';

export default class SpinView extends Component{
  constructor(props){
    super(props);
    this.spinAnim= new Animated.Value(0);
  }
  componentDidMount(){
    this.spin();
  }
  spin(){
    this.spinAnim.setValue(0)
    Animated.timing(this.spinAnim,{
      duration:4000,
      toValue:1,
    }).start(()=>this.spin())
  }
  render(){
    const spin = this.spinAnim.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','360deg']
    });
    return(
      <View style={styles.container}>
      <Animated.Image
        source={images.reactjs}
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spin}]
        }}
      />
      </View>
    );
  }
}
const styles= StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})