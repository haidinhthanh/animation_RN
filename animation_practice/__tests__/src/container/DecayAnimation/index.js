import React from 'react'
import {View,Animated,Button} from 'react-native'
import images from '../../asset/images';

export default class DecayAnimation extends React.Component{
    constructor(props){
        super(props);
        this.dropAnim= new Animated.Value(0);
    }
    render(){
        let dropAnim= this.dropAnim;
        return(
            <View style={{flex:1}}>
                <Animated.Image
                    source={images.reactjs}
                    style={{
                        width:150,
                        height:150,
                        transform:[{
                            translateY: dropAnim,
                        }]
                    }}
                />
                <View style={{marginTop:300}}>
                    <Button 
                        title='drop'
                        onPress={this.onDrop}
                    />
                </View>
            </View>
        );
    }
    onDrop=()=>{
        Animated.decay(this.dropAnim,{
            velocity: 0.8,
        }).start(()=>this.dropAnim.setValue(0))
    }
}
