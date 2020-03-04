/* eslint-disable arrow-parens */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 16,
    margin: 20,
  },
});

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.text,
      isLoading: this.props.isLoading,
    });
  }

  render() {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>{this.state.text}</Text>
      </View>
    );
  }
}

export default Loading;
