import React, { Component, PropTypes } from 'react';
import { Easing, Modal, Dimensions, Animated, View , Text, InteractionManager} from 'react-native';
const { width, height } = Dimensions.get('window');
class CircleTransition extends Component {
  constructor (props) {
    super(props);
    this.state = {
        scale: new Animated.Value(1),
        moveUp: new Animated.Value(0),
        color: '#fff',
        animationDone: false
        };
    this.arrayAnim= [];
    for(var i=0 ; i< this.props.pages.length;i++){
      this.arrayAnim[i]= new Animated.Value(1);
    }
    this.start.bind(this);
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(()=>{
      this.setState({
        animationDone: true,
      })
    })
  }
  start(color,newCounter,oldCounter, callbackColor, callbackImg) {
    this.setState({
      color: color,
      moveUp: new Animated.Value(0),
    }, () => {
      callbackImg();
      this.animate(callbackColor,newCounter,oldCounter);
    });
  }
  animate(callback,newCounter ,oldCounter) {
    const scaleAnim= Animated.timing(this.state.scale, {
      toValue: 6,
      duration: 150,
      easing: this.props.easing,
      useNativeDriver: true,
    });
    const moveAnim= Animated.timing(this.state.moveUp,{
      toValue:1,
      duration:100,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    });
    const scaleUp= Animated.timing(this.arrayAnim[newCounter],{
      toValue:1.7,
      duration: 100,
      easing: this.props.easing,
      useNativeDriver: true,
    });
    if(oldCounter!==null){
      const scaleDown= Animated.timing(this.arrayAnim[oldCounter],{
        toValue:1,
        duration: 100,
        easing: this.props.easing,
        useNativeDriver: true,
      });
      Animated.parallel([scaleAnim,moveAnim, scaleUp, scaleDown],{
        useNativeDriver:true
      }).start(()=>{
        callback();
        this.hideCircle();
      });
    }
    else{
      Animated.parallel([scaleAnim,moveAnim, scaleUp],{
        useNativeDriver:true
      }).start(()=>{
        callback();
        this.hideCircle();
      });
    }
  }
  hideCircle=()=>{
    this.setState({
      scale: new Animated.Value(0),
    });
  }
  getTopPosition=()=>{
    return height;
  }
  render () {
    const {scale, color, animationDone} = this.state;
    const { size, screen, pages, currentIndex} = this.props;
    const arrayAnim= this.arrayAnim;
    let topPosition = this.getTopPosition();
    const moveImgAnim= this.state.moveUp.interpolate({
      inputRange:[0,1],
      outputRange:[-60,-80]
    });
    const moveTextAnim= this.state.moveUp.interpolate({
      inputRange:[0,1],
      outputRange:[-40,-60]
    });
    const opacityAnimAray= arrayAnim.map((value,index)=>{
      return arrayAnim[index].interpolate({
        inputRange:[1,2],
        outputRange:[0,1]
      });
    })
    if(animationDone){
      return (
        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
          <Animated.View style={{
            position: 'absolute',
            backgroundColor: color,
            top: topPosition,
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{
              scale: scale
            }]
          }}>
          </Animated.View>
          <Animated.Image
            source={screen.image}
            style={[{width: 180, height:180, tintColor:'white', }, 
              {
                transform:[{
                  translateY: moveImgAnim,  
                }]
              }
            ]}
          >
          </Animated.Image>
          <View
            style={{ width:width*4/5, alignItems: 'center'}}
          >
            <Animated.Text
              style={{ color:'#fff', fontSize:40, fontWeight: 'bold', transform:[{translateY: moveTextAnim,}]}}
            >
              {screen.title}
            </Animated.Text>
            <Animated.Text
              style={{color:'#fff', fontSize:20,textAlign:'center',transform:[{translateY: moveTextAnim,}],}}
            >
              {screen.content}
            </Animated.Text>
          </View>
          <View style={{ flexDirection:'row', position:'absolute', bottom:60 }}>
            {
              pages.length >0 && pages.map((page,index)=>{
                  let dotStyle={};
                  if( currentIndex>= index)
                    dotStyle={ width:30, height:30,backgroundColor:'#fff', borderRadius:15, margin:18, opacity: 0.7, alignItems:'center', justifyContent:'center'}
                  else{
                    dotStyle={ width:30, height:30,backgroundColor:color, borderRadius:15, margin:18, opacity: 0.7, alignItems:'center', justifyContent:'center', 
                      borderWidth:2, borderColor: 'white'}
                  }
                  return (
                    <Animated.View 
                      style={[dotStyle,
                        {transform:[{
                          scale: arrayAnim[index]
                        }]}]}
                      key={index}
                    >
                      <Animated.Image
                        source={page.icon}
                        style={{
                          width:15, height:15, opacity: opacityAnimAray[index], tintColor:color,
                        }}
                      />
                    </Animated.View>
                  );
              })
            }
          </View>
        </View>
      )}
    else{
      return (<View></View>);
    }  
    }
}
CircleTransition.defaultProps = {
  size: Math.min(width, height) - 1,
  duration: 400,
  easing: Easing.linear
}
export default CircleTransition;