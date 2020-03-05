import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  appbar: {
    position: 'absolute',
    top: 0,
    height: 78,
    paddingTop: 30,
    backgroundColor: '#265356',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 10,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 18,
  },
});


class Appbar extends React.Component {
  render() {
    return (
      <View style={styles.appbar}>
        <Text style={styles.appbarTitle}>MEMO-APP</Text>
      </View>
    );
  }
}

export default Appbar;
