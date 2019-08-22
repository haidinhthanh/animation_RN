import React from 'react'
import {View, Animated,PanResponder} from 'react-native';

export default class PanResDemo extends React.Component{
    constructor(props){
        super(props);
        this.scaleAnim= new Animated.Value(1);
        this.moveAnim = new Animated.ValueXY();
        this._value = {x: 0, y: 0};
        this.moveAnim.addListener((value) => this._value = value);
        this._panRes= PanResponder.create({
            onStartShouldSetPanResponder:()=>true,
            onMoveShouldSetPanResponder:()=>true,
            onPanResponderGrant:(e,gestureState)=>{
                Animated.spring(this.scaleAnim,{
                    toValue:1.3,
                }).start();
                this.moveAnim.setOffset({
                    x: this._value.x,
                    y: this._value.y,
                })
                this.moveAnim.setValue({ x: 0, y: 0})
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.moveAnim.x, dy: this.moveAnim.y}
            ]),
            onPanResponderRelease:(e,gestureState)=>{   
                this.moveAnim.flattenOffset();
                Animated.spring(this.scaleAnim,{
                    toValue:1,
                    friction:1,
                    tension:4,
                }).start();
            }
        });
    }
    
    render(){
        const animStyle= {
            transform:[
                {scale: this.scaleAnim},
            ]
        }
        return(
            <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                <Animated.View
                    style={[{
                        width:100,
                        height:100,
                        borderRadius:50,
                        backgroundColor:'blue'
                    },animStyle,this.moveAnim.getLayout()]}
                    {...this._panRes.panHandlers}
                />
            </View>
        )
    }
}


