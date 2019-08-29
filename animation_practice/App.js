import React,{Component} from 'react';
import {createAppContainer,createBottomTabNavigator,createStackNavigator} from 'react-navigation'
import TimingAnimation from './src/container/TimingAnimation';
import SpringAnimation from './src/container/SpringAnimation';
import DecayAnimation from './src/container/DecayAnimation';
import ComposeAnimation from './src/container/ComposeAnimation';
import LoadArray from './src/container/Demo/LoadArray';
import Demo from './src/container/Demo';
import TrackValue from './src/container/Demo/TrackValue';
import Gesture from './src/container/Gesture';
import DemoNavigator from './src/container/Gesture/DemoNavigator';
import PanResDemo from './src/container/Gesture/PanResDemo';
import LayoutAnim from './src/container/LayoutAnim';
import HorizontalList from './src/container/Demo/HorizontalList';
import ScreenHorizontal from './src/container/Gesture/ScreenHorizontal.js';
import BubbleAnim from './src/container/Demo/BubbleAnim';
import BasicAnimation from './src/container/BasicAnimation';
import CarouselAnim from './src/container/Demo/CarouselAnim';

const DemoStack = createStackNavigator({
  DemoScreen:{
    screen: Demo,
  },
  LoadArrayScreen:{
    screen: LoadArray,
  },
  ValueTrackScreen:{
    screen: TrackValue,
  },
  HorizonList:{
    screen: HorizontalList
  },
  BubbleAnim:{
    screen: BubbleAnim,
  },
  CarouselAnim:{
    screen: CarouselAnim,
  }
})
const GestureStack= createStackNavigator({
  Gesture:{
    screen: Gesture,
  },
  DemoNavigator: {
    screen: DemoNavigator,
  },
  PanResDemo:{
    screen: PanResDemo,
  },
  ScreenHorAnim:{
    screen: ScreenHorizontal,
  }
})
const BasicAnimStack= createStackNavigator({
  BasicAnim:{
    screen: BasicAnimation
  },
  TimingAnim: {
    screen: TimingAnimation,
  },
  SpringAnim:{
    screen: SpringAnimation,
  },
  DecayAnim:{
    screen: DecayAnimation,
  },
  ComposeAnim:{
    screen: ComposeAnimation,
  },
})
const AppBotomNavigator= createBottomTabNavigator({
  BasicAnim:{
    screen: BasicAnimStack,
  },
  Demo:{
    screen: DemoStack,
  },
  Gesture:{
    screen: GestureStack,
  },
  LayoutAnim:{
    screen: LayoutAnim
  }
})
export default createAppContainer(AppBotomNavigator);