import React from 'react'
import {View, Animated,Button, Easing} from 'react-native'
import images from '../../asset/images';

export default class ComposeAnimation extends React.Component{
    constructor(props){
        super(props);
        this.shapeAnim= new Animated.Value(0);
        this.moveAnim= new Animated.Value(0);
        this.moveRightAnim= new Animated.Value(0);
    }
    render(){
        let animationStyle ={
            borderRadius: this.shapeAnim,
            marginLeft: this.moveRightAnim,
            transform:[{ translateY: this.moveAnim}]
        }
        return(
            <View style={{flex:1,}}> 
                <Animated.View
                    style={[{backgroundColor:'red', width:150, height:150}, animationStyle]}
                />
                <View style={{marginTop:200}}>
                    <Button
                        title='sequence'
                        onPress={this.onSequence}
                    />
                    <Button
                        title='parallel'
                        onPress={this.onParallel}
                    />
                    <Button
                        title='stagger'
                        onPress={this.onStagger}
                    />
                    <Button
                        title='combine'
                        onPress={this.onCombine}
                    />
                </View>
            </View>
        );
    }
    onSequence=()=>{
        const shapAnim=Animated.timing(this.shapeAnim,{
            toValue:100,
            duration:3000,
            easing: Easing.linear
        });
        const moveAnim=Animated.timing(this.moveAnim,{
            toValue: 200,
            duration:3000,
            easing: Easing.bounce,
        });
        Animated.sequence([shapAnim,moveAnim]).start(()=>{
            this.shapeAnim.setValue(0);
            this.moveAnim.setValue(0);
        })
    }
    onParallel=()=>{
        const shapAnim=Animated.timing(this.shapeAnim,{
            toValue:100,
            duration:3000,
            easing: Easing.linear
        });
        const moveAnim=Animated.timing(this.moveAnim,{
            toValue: 200,
            duration:3000,
            easing: Easing.bounce,
        });
        Animated.parallel([shapAnim,moveAnim]).start(()=>{
            this.shapeAnim.setValue(0);
            this.moveAnim.setValue(0);
        })
    }
    onStagger=()=>{
        const shapAnim=Animated.timing(this.shapeAnim,{
            toValue:100,
            duration:3000,
            easing: Easing.linear
        });
        const moveAnim=Animated.timing(this.moveAnim,{
            toValue: 200,
            duration:3000,
            easing: Easing.bounce,
        });
        Animated.stagger(10000,[shapAnim,moveAnim]).start(()=>{
            this.shapeAnim.setValue(0);
            this.moveAnim.setValue(0);
        })
    }
    onCombine=()=>{
        const shapAnim=Animated.timing(this.shapeAnim,{
            toValue:100,
            duration:3000,
            easing: Easing.linear
        });
        const moveAnim=Animated.timing(this.moveAnim,{
            toValue: 200,
            duration:3000,
            easing: Easing.bounce,
        });
        const mrAnim= Animated.spring(this.moveRightAnim,{
            toValue: 200,
            friction:1,
            tension:20,
        })
        Animated.sequence([
            shapAnim,
            Animated.parallel([moveAnim, mrAnim])
        ]).start(()=>{
            this.moveAnim.setValue(0);
            this.moveRightAnim.setValue(0);
            this.shapeAnim.setValue(0);
        });
    }
}