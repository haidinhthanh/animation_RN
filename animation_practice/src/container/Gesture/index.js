import React from 'react'
import {View,Button} from 'react-native'

export default class Gesture extends React.Component{
  render(){
    let {navigation} = this.props;
    return(
      <View>
        <Button
          title='Navigator Demo'
          onPress={()=>navigation.navigate("DemoNavigator")}
        />
        <Button
          title='PanRes Demo'
          onPress={()=>navigation.navigate("PanResDemo")}
        />
      </View>
    );
  }
}


