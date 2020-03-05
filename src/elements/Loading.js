import React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
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
