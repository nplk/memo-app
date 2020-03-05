import React from 'react';
import {
  StyleSheet, View, TouchableHighlight, Text,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute', // 最上位のTouchableHightlight側でposition指定
    bottom: 32,
    width: 100, // ボタンだけでなくTH側でも幅と高さ指定しないとタッチの範囲が広くなる
    height: 48,
    backgroundColor: '#eee',
    borderRadius: 25,
  },
  textButton: {
    width: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

const TextButton = (props) => {
  const left = props.left ? props.left : 32;
  return (
    <TouchableHighlight style={[styles.container, { left }]} underlayColor="transparent" onPress={props.onPress}>
      <View style={styles.textButton}>
        <Text>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TextButton;
