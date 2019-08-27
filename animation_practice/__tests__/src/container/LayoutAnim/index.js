import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  UIManager
} from 'react-native';

// for android support
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.2,
    duration:1000,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.2,
    duration:1000,
  },
  delete: {
  duration: 1000,
  type: LayoutAnimation.Types.spring,
  springDamping: 0.2,
  property: LayoutAnimation.Properties.opacity,
},
};

export default class LayoutAnim extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onPress(index) {

    //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    // Or use a Custom Layout Animation
    LayoutAnimation.configureNext(CustomLayoutAnimation);

    this.setState({ index: index });
  }

  renderButton(index) {
    return (
      <TouchableOpacity
        key={'button' + index}
        style={styles.button}
        onPress={() => this.onPress(index)}>
        <Text>{index}</Text>
      </TouchableOpacity>
    );
  }

  renderCircle(key) {
    var size = 50;
    return (
      <View key={key} style={{width: size, height: size, borderRadius: size / 2.0, backgroundColor: 'sandybrown', margin: 20}}/>
    );
  }

  render() {
    const leftStyle = this.state.index === 0 ? { flex: 1 } : { width: 20 };
    const middleStyle = this.state.index === 2 ? { width: 20 } : { flex: 1 };
    const rightStyle = { flex: 1 };
    const whiteHeight = this.state.index * 80;

    const circles = [];
    for (let i = 0; i < (5 + this.state.index); i++) {
      circles.push(this.renderCircle(i));
    }

    return (
      <View style={styles.container}>
        <View style={styles.topButtons}>
          {this.renderButton(0)}
          {this.renderButton(1)}
          {this.renderButton(2)}
        </View>
        <View style={styles.content}>
          <View style={{flexDirection: 'row', height: 100}}>
            <View style={[leftStyle, {backgroundColor: 'firebrick'}]}/>
            <View style={[middleStyle, {backgroundColor: 'seagreen'}]}/>
            <View style={[rightStyle, {backgroundColor: 'steelblue'}]}/>
          </View>
          <View style={{height: whiteHeight, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}} removeClippedSubviews={true}>
            <View>
              <Text>Stuff Goes Here</Text>
            </View>
          </View>
          <View style={styles.circleContainer}>
            {circles}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  topButtons: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'lightblue',
  },
  button: {
    flex: 1,
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
  },
  circleContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
