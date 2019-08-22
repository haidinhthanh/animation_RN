import React from 'react'
import {View,Button} from 'react-native'

export default class Demo extends React.Component{
    render(){
        let {navigation} = this.props;
        return(
            <View style={{flex:1, alignItems:'center' }}>
                <Button
                    title='Load Array Demo'
                    onPress={()=>navigation.navigate('LoadArrayScreen')}
                />
                <Button
                    title='ValueTrackScreen'
                    onPress={()=>navigation.navigate('ValueTrackScreen')}
                />
            </View>
        );
    }
}
