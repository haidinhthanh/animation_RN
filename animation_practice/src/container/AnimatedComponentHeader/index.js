import React from 'react';
import { View, FlatList, Text, StyleSheet, Animated } from 'react-native';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 21, 22, 23, 24, 25, 26];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class AnimatedComponentHeader extends React.Component {
	state = {
		animatedValue: new Animated.Value(0),
	};
	
	_renderItem = ({item}) => {
		return (
			<View style={styles.bigItem}>
				<Text style={styles.itemText}>{item}</Text>
			</View>
		)
	};
	
	render() {
		let translateY = this.state.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: [0, -180],
			extrapolate: 'clamp',
		});
		
		return (
			<View style={styles.container}>
				<AnimatedFlatList
					contentContainerStyle={{marginTop: 200}}
					scrollEventThrottle={16} 
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {y: this.state.animatedValue}}}],
						{useNativeDriver: true} 
					)}
					data={data}
					renderItem={this._renderItem}
					keyExtractor={(item, i) => i}/>
				<Animated.View style={[styles.headerWrapper, {transform: [{translateY}]}]}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bigItem: {
		margin: 8,
	},
	itemText: {
		backgroundColor: 'black',
		fontSize: 20,
		padding: 20,
	},
	headerWrapper: {
		position: 'absolute',
		backgroundColor: '#ccccff',
		height: 200,
		left: 0,
		right: 0,
	}
});