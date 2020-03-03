/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fffdf6',
  },
});

class MemoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handlePress() {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('MemoCreate', { currentUser: params.currentUser });
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList navigation={this.props.navigation} />
        <CircleButton
          name="plus"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

export default MemoListScreen;
