import React, {PropType} from 'react'
import {Animated, PanResponder} from 'react-native'

const SwipeDirection= {
    SWIPE_LEFT: "SWIPE_LEFT",
    SWIPE_RIGHT: "SWIPE_RIGHT",
}
function isValidSwipe(velocityThreshold,swipeOffsetThreshold, velocity, swipeOffset){
    return Math.abs(velocity)>=velocityThreshold && swipeOffset< swipeOffsetThreshold;
}
class Swipe extends React.Component{
    constructor(props){
        super(props);
        this.swipeConfig={
            velocityThreshold: 0.3,
            swipeOffsetThreshold: 80,
        }
        this._panResponder= PanResponder.create(
            {
                onStartShouldSetPanResponder:()=> true,
                onPanResponderRelease:(e,gesturState)=>{
                    const swipeDirection= this.getSwipeDirection(gesturState);
                    this.swipeHandler(swipeDirection,gesturState);
                }
            }
        );
    }
    swipeHandler=(swipeDirection, gesturState)=>{
        const {SWIPE_LEFT,SWIPE_RIGHT } = SwipeDirection
        switch(swipeDirection){
            case SWIPE_LEFT: 
                this.props.onSwipeLeft(gesturState);
                break;
            case SWIPE_RIGHT:
                this.props.onSwipeRight(gesturState);
                break;
        }
    }
    getSwipeDirection= (gesturState)=>{
        const {SWIPE_LEFT, SWIPE_RIGHT } = SwipeDirection;
        const {dx,dy} = gesturState;
        if(this.isValidSwipeHorizontal(gesturState)){
            return dx<0 ? SWIPE_LEFT: SWIPE_RIGHT;
        }
    }
    isValidSwipeHorizontal=(gesturState)=>{
        const {velocityThreshold,swipeOffsetThreshold} = this.swipeConfig;
        const {vx,dy} = gesturState;
        return isValidSwipe(velocityThreshold,swipeOffsetThreshold, vx, dy);
    }
    render(){
        return(
            <Animated.View
            style={this.props.style}
            {...this._panResponder.panHandlers}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
Swipe.defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
  }
export default Swipe;