import React from 'react'
import {View,Animated,Button} from 'react-native'

const arr= [];
for (var i=0; i<500;i++){
    arr.push(i);
}

export default class LoadArray extends React.Component{
    constructor(props){
        super(props);
        this.animationValues=[];
        arr.forEach((value)=>{
            this.animationValues[value]= new Animated.Value(0);
        })
    }
    render(){
        const animationArray = arr.map((value,index)=>{
            return(
                <Animated.View
                    key={index}
                    style={{
                        backgroundColor: 'red',
                        marginTop:3,
                        marginLeft:3,
                        opacity: this.animationValues[value],
                        width:20,
                        height:20,
                    }}
                />
            );
        })
        return(
            <View style={{flex:1, }}>
                <Button
                    title="load sequence"
                    onPress={this.onLoad}
                />
                <Button
                    title="load stagger"
                    onPress={this.onLoadStagger}
                />
                <View style={{flex:1, flexDirection: 'row', flexWrap:'wrap'}}>
                    {animationArray}
                </View>
            </View>

        );
    }
    onLoad=()=>{
        const arrAnim=arr.map((value,index)=>{
            return Animated.timing(this.animationValues[value],{
                toValue:1,
                duration:50,
            });
        })
        Animated.sequence(arrAnim).start();
    }
    onLoadStagger=()=>{
        const arrAnim=arr.map((value,index)=>{
            return Animated.timing(this.animationValues[value],{
                toValue:1,
                duration:6000,
            });
        })
        Animated.stagger(40,arrAnim).start();
    }
}