import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import fontAwesome from '../../assets/fonts/fa-solid-900.ttf';

const CustomIcon = createIconSet(
  {
    pencil: '\uf303',
    plus: '\uf067',
    check: '\uf00c',
  },
  'fontAwesome',
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // 最上位のTouchableHightlight側でposition指定
    bottom: 32,
    right: 32,
    width: 48, // ボタンだけでなくTH側でも幅と高さ指定しないとタッチの範囲が広くなる
    height: 48,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  circleButtonTitle: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: 'fontAwesome',
  },
});

class CircleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  // マウント時にフォントをロードする
  async componentDidMount() {
    await Font.loadAsync({
      fontAwesome,
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const {
      name, style, color, onPress,
    } = this.props;

    let bgColor = '#e31676';
    let textColor = '#fff';

    if (color === 'white') {
      bgColor = '#fff';
      textColor = '#e31676';
    }

    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress} underlayColor="transparent">
        <View style={[styles.circleButton, { backgroundColor: bgColor }]}>
          {this.state.fontLoaded ? (
            <CustomIcon
              name={name}
              style={[styles.circleButtonTitle, { color: textColor }]}
            >
              {this.props.children}
            </CustomIcon>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}

export default CircleButton;
