import React,{Component} from 'react';
import {Text,View, Animated, Easing, Button, StyleSheet} from 'react-native';

export default class TimingAnimation extends Component{
  constructor(props){
    super(props);
    this.fadeAnime= new Animated.Value(1);
    this.backAnim= new Animated.ValueXY(
      {
        x:80,
        y:0
      });
    this.spinAnim= new Animated.Value(0);
    this.movAnim= new Animated.Value(0);
  }
  render(){
    let fadeAnime = this.fadeAnime;
    let backAnim = this.backAnim;
    let spinAnim = this.spinAnim.interpolate({
      inputRange:[0,1],
      outputRange:['0deg','360deg']
    });
    let movAnim = this.movAnim.interpolate({
      inputRange:[0,0.5,1],
      outputRange:[0,100,0]
    })
    return(
      <View style={{flex:1, }}>
        <Animated.View
          style={[{
            width:150,
            height:100,
            backgroundColor:'#99ffff',
            alignItems: 'center',
            justifyContent: 'center',             
          },
          {
            opacity: fadeAnime,
            transform: [{rotate: spinAnim}],
            marginLeft: movAnim, 
          },
          backAnim.getLayout()
          ]}
        >
          <Text style={{fontSize:30}}>Animated View</Text>
        </Animated.View>
        <View
            style={{ margin:10,flex:1, justifyContent:'center' }}
          >
            <Button
              title='Fade'
              onPress={this.onFade}
            />
            <Button 
              title='Back'
              onPress={this.onBack}
            />
            <Button 
              title='Spin'
              onPress={this.onSpin}
            />
            <Button 
              title='Moving'
              onPress={this.onMov}
            />
            <Button 
              title='Moving InOut'
              onPress={this.onMovInOut}
            />
          </View>
    </View>
    );
  }
  onFade=()=>{
    Animated.timing(this.fadeAnime,{
      duration:4000,
      toValue:0,
    }).start(()=>{this.fadeAnime.setValue(1)});
  }
  onBack=()=>{
    Animated.timing(this.backAnim,{
      duration:8000,
      toValue:{
        x:300,
        y:0
      },
      easing: Easing.back(),
    }).start(()=>this.backAnim.setValue({x:80,y:0}));
  }
  onSpin=()=>{
    Animated.timing(this.spinAnim,{
      duration:6000,
      toValue:1,
    }).start(()=>this.spinAnim.setValue(0));
  }
  onMov=()=>{
    Animated.timing(this.movAnim,{
      toValue:1,
      duration:4000,
      easing: Easing.linear,
    }).start(()=>this.movAnim.setValue(0))
  }
  onMovInOut=()=>{
    Animated.timing(this.movAnim,{
      toValue:1,
      duration:4000,
      easing: Easing.inOut(Easing.linear),
    }).start(()=>this.movAnim.setValue(0))
  }
}