import React from 'react'
import {View,Text, ScrollView, Dimensions, Image, Animated} from 'react-native'
import images from '../../../asset/images'
import Swipe from '../BubbleAnim/Swipe'

var {width,height} = Dimensions.get("window");
const screens=[
    {
        title: "View1",
        content: "Bla",
        image: images.view1,
    },
    {
        title: "View2",
        content: "Bla",
        image: images.view2,
    },
    {
        title: "View3",
        content: "Bla",
        image: images.view3,
    },
    {
        title: "View4",
        content: "Bla",
        image: images.view4,
    },
    {
        title: "View5",
        content: "Bla",
        image: images.view5,
    },
]

const Screen = (props)=>{
    return(
        <Animated.View style={[{width: 260, height:364,position:'absolute', borderRadius:20,}, props.animStyles]}>
            <Image
                source={props.screens.image}
                style={{ width: 260, height:260,borderTopLeftRadius:20,borderTopRightRadius:20}}
            />
            <View
                style={{ width: 260, height:100,borderBottomLeftRadius:20, borderBottomRightRadius:20, backgroundColor:'#fff', padding:10}}
            >
                <Text style={{fontSize:23,fontWeight:'bold',}} >
                    {props.screens.title}
                </Text>
                <Text style={{fontSize:20}} >
                    {props.screens.content}
                </Text>
            </View>
        </Animated.View>
    );
}
export default class CarouselAnim extends React.Component{
    constructor(props){
        super(props);
        this.anim= new Animated.Value(0);
        this.arrayAnim= [];
        this.arrayMove= [];

        screens.map((value,index)=>{
            this.arrayAnim[index]= Animated.add(this.anim, index);
        });
        screens.map((value,index)=>{
            this.arrayMove[index]= new Animated.Value(0);
        })
        this.state={
            currentScreen: 0,
        }
    }
    animatedLeft=(currentScreen)=>{
        const viewAnim= Animated.timing(this.anim,{
            toValue: -currentScreen-1,
            timing: 1000,
        });
        const moveAnim= Animated.timing(this.arrayMove[currentScreen],{
            toValue:1,
            timing: 1000,
        });
        Animated.parallel([viewAnim,moveAnim]).start();    
    }
    animatedRight=(currentScreen)=>{
        const viewAnim=Animated.timing(this.anim,{
            toValue: -currentScreen+1,
            timing: 1000,
        });
        const moveAnim= Animated.timing(this.arrayMove[currentScreen-1],{
            toValue:0,
            timing: 1000,
        });
        Animated.parallel([viewAnim,moveAnim]).start(); 
    }

    onSwipeLeft(){
        const { currentScreen} =this.state;
        if(currentScreen<screens.length-1){
            this.setState({
                    currentScreen: currentScreen+1,
                }, ()=>{this.animatedLeft(currentScreen)})
        }
    }
    onSwipeRight(){
        const { currentScreen} =this.state;
        if(currentScreen>0){
            this.setState({
                    currentScreen: currentScreen-1,
                }, ()=>{this.animatedRight(currentScreen)});
        }
    }
    
    
    render(){
        let arrayLeftAnim= this.arrayAnim.map((value,index)=>{
            let animtedValue= this.arrayAnim[index];
            return animtedValue.interpolate({
                inputRange:[index-1, index, index+1],
                outputRange:[(index+1)*30, (index+2)*30, (index+3)*30]
            });
        });
        let arrayOpacityAnim= this.arrayAnim.map((value,index)=>{
            let animtedValue= this.arrayAnim[index];
            return animtedValue.interpolate({
                inputRange:[index-1, index, index+1],
                outputRange:[1-(index-1)*0.4, 1-index*0.4, 1-(index+1)*0.4]
            })
        })
        let arrayElevationAnim= this.arrayAnim.map((value,index)=>{
            let animtedValue= this.arrayAnim[index];
            return animtedValue.interpolate({
                inputRange:[index-1, index, index+1],
                outputRange:[4-(index-1), 4-index, 4-(index+1)]
            })
        })
        let arrayScaleAnim= this.arrayAnim.map((value,index)=>{
            let animtedValue= this.arrayAnim[index];
            return animtedValue.interpolate({
                inputRange:[index-1, index, index+1],
                outputRange:[1-(index-1)*0.1, 1-index*0.1, 1-(index+1)*0.1]
            })
        });

        let arrayTranslate= this.arrayMove.map((value,index)=>{
            let animatedValue= this.arrayMove[index];
            return animatedValue.interpolate({
                inputRange:[0,1],
                outputRange:[0,-500],
            })
        });
        let arrayRotateZ= this.arrayMove.map((value,index)=>{
            let animatedValue= this.arrayMove[index];
            return animatedValue.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','-45deg'],
            })
        });
        return(
            <View style={{ flex:1, justifyContent:'center'}}>
                <Swipe
                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center',}]}
                    onSwipeLeft={this.onSwipeLeft.bind(this)}
                    onSwipeRight={this.onSwipeRight.bind(this)}
                >
                    <View style={{flexDirection:'row', width:width,height:400, alignItems:'center', justifyContent:'center' }}>
                        {
                            screens.map((value,index)=>{
                                let animStyles= {
                                    left: arrayLeftAnim[index],
                                    opacity: arrayOpacityAnim[index],
                                    elevation: arrayElevationAnim[index],
                                    transform: [{
                                        scale: arrayScaleAnim[index],
                                    },{
                                        translateX: arrayTranslate[index],
                                    },{
                                        rotateZ: arrayRotateZ[index]
                                    }
                                    ]
                                }
                                return <Screen screens={screens[index]} animStyles={animStyles}/>;
                            })
                        }
                    </View>
                </Swipe>
            </View>
        );
    }
}