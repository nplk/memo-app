import React from 'react';
import { StyleSheet, View } from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

class MemoListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MemoList />
        <CircleButton name="plus" />
      </View>
    );
  }
}

export default MemoListScreen;
