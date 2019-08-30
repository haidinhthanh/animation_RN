import React from 'react'
import {View,Button} from 'react-native'

export default class BasicAnimation extends React.Component{
  render(){
    let {navigation} = this.props;
    return(
      <View>
        <Button
          title='Timing Anim'
          onPress={()=>navigation.navigate("TimingAnim")}
        />
        <Button
          title='Spring Anim'
          onPress={()=>navigation.navigate("SpringAnim")}
        />
        <Button
          title='Decay Anim'
          onPress={()=>navigation.navigate("DecayAnim")}
        />
        <Button
          title='Compose Anim'
          onPress={()=>navigation.navigate("ComposeAnim")}
        />
        <Button
          title='Animated Comp'
          onPress={()=>navigation.navigate("AnimatedComp")}
        />
      </View>
    );
  }
}
