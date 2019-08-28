import React from 'react'
import {View,Text, Animated,Button} from 'react-native'
import images from '../../asset/images'
export default class SpringAnimation extends React.Component{
    constructor(props){
        super(props);
        this.scaleAnim = new Animated.Value(0.5);
        this.dropAnim = new Animated.Value(0);
    }
    render(){
        let scaleAnim = this.scaleAnim;
        let dropAnim = this.dropAnim;
        return(
            <View
                style={{ flex:1,}}
            >
                <Animated.Image
                    style={{ width: 227, height: 200, transform: [{scale: scaleAnim}] ,alignSelf:'center'}}                            
                    source={images.reactjs}
                />
                <View style={{marginTop:100,}}>
                    <Button
                        title="scale"
                        onPress={this.onScale}
                    />
                    <Button
                        title="scale and bounce"
                        onPress={this.onScaleAndBounce}
                    />
                    <Button
                        title="scale and bounce and tension"
                        onPress={this.onScaleAndBounceTension}
                    />
                    <Button
                        title="scale and speed"
                        onPress={this.onScaleAndSpeed}
                    />
                    <Button
                        title="scale and speed and bouciness"
                        onPress={this.onScaleAndSpeedBouciness}
                    />
                </View>
            </View>
        );
    }
    onScale=()=>{
        Animated.spring(this.scaleAnim,{
            toValue:1,
        }).start(()=> this.scaleAnim.setValue(0.5))
    }
    onScaleAndBounce=()=>{
        Animated.spring(this.scaleAnim,{
            toValue:1,
            friction:1,
        }).start(()=> this.scaleAnim.setValue(0.5))
    }
    onScaleAndBounceTension=()=>{
        Animated.spring(this.scaleAnim,{
            toValue:1,
            friction:1,
            tension:100,
        }).start(()=> this.scaleAnim.setValue(0.5))
    }
    onScaleAndSpeed=()=>{
        Animated.spring(this.scaleAnim,{
            toValue:1,
            speed:100,
        }).start(()=> this.scaleAnim.setValue(0.5))
    }
    onScaleAndSpeedBouciness=()=>{
        Animated.spring(this.scaleAnim,{
            toValue:1,
            speed:100,
            bounciness:20,
        }).start(()=> this.scaleAnim.setValue(0.5))
    }
}
