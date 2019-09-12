import React from 'react'
import {View,Button} from 'react-native'

export default class Demo extends React.Component{
    render(){
        let {navigation} = this.props;
        return(
            <View>
                <Button
                    title='Load Array Demo'
                    onPress={()=>navigation.navigate('LoadArrayScreen')}
                />
                <Button
                    title='ValueTrackScreen'
                    onPress={()=>navigation.navigate('ValueTrackScreen')}
                />
                <Button
                    title='Horizontal list'
                    onPress={()=>navigation.navigate('HorizonList')}
                />
                <Button
                    title='BubbleAnim'
                    onPress={()=>navigation.navigate('BubbleAnim')}
                />
                <Button
                    title='CarouselAnim'
                    onPress={()=>navigation.navigate('CarouselAnim')}
                />
                <Button
                    title='PageIndicator'
                    onPress={()=>navigation.navigate('PageIndicator')}
                />
            </View>
        );
    }
}
