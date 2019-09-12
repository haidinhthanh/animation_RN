import React from  'react'
import {Image,View} from 'react-native'
import CircleTransition from './CircleTransition';
import Swipe from './Swipe';
import images from '../../../asset/images';


const screens = [{
    id: 0,
    bgcolor: '#698FB2',
    image: images.hotel,
    title:'Hotels',
    content: 'All hotels and hostels are storted by hospitality rating',
    icon: images.key,
  }, {
    id: 1,
    bgcolor: '#68B0B3',
    image: images.bank,
    title:'Banks',
    content: 'We carefully all banks before add them into the app',
    icon: images.wallet,
  }, {
    id: 2,
    bgcolor: '#9B91BA',
    image: images.store,
    title:'Stores',
    content: 'All stores are catagorized for your convenien',
    icon: images.shop,
  }]

export default class BubbleAnim extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _counter: 0,
            currentbg: screens[0].bgcolor,
            currentSc: screens[0],
        };
        this.onSwipeLeft=this.onSwipeLeft.bind(this);
        this.onSwipeRight=this.onSwipeRight.bind(this);
    }
    componentDidMount(){
        const {currentbg,currentSc, _counter} = this.state;
        this.circleTransition.start(currentbg,_counter,null, this.changeColor.bind(this,currentSc), this.changeScreen.bind(this,currentSc));
    }
    changeColor(newColor){
        this.setState({
           currentbg: newColor,
        });
    }
    changeScreen(newSc){
        this.setState({
            currentSc: newSc,
        });
    }
    onSwipe=(newCounter, oldCounter)=>{
        let newColor= screens[newCounter].bgcolor;
        let newSc= screens[newCounter];
        this.setState({
            _counter: newCounter,
        }, () => {
            this.circleTransition.start(newColor,newCounter,oldCounter,this.changeColor.bind(this,newColor), this.changeScreen.bind(this, newSc));
        });
    }
    onSwipeLeft(){
        const { _counter } = this.state;
        if( _counter <screens.length-1){
            let newCounter=  _counter+1;
            this.onSwipe(newCounter, _counter);
        }
    }
    onSwipeRight(){
        const { _counter } = this.state;
        if(_counter!==0){
            let newCounter= _counter-1
            this.onSwipe(newCounter,_counter);
        }
    }
    render(){
        return(
            <Swipe
                style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.currentbg}]}
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
            >
                <CircleTransition
                    screen={this.state.currentSc}
                    currentIndex={this.state._counter}
                    ref={(circle)=>{ this.circleTransition=circle}}
                    pages={screens}
                >
                </CircleTransition>
            </Swipe>
       );
    }
}
