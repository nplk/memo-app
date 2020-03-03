/* eslint-disable no-unused-vars */
import React from 'react';
import {
  StyleSheet, View, TextInput, TouchableHighlight, Text,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  button: {
    backgroundColor: '#e31676',
    height: 48,
    width: '70%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // firebaseでのログイン処理
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => { // サインアップ成功時の処理
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(() => { // サインアップ失敗時の処理
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>新規会員登録</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => { this.setState({ email: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => { this.setState({ password: text }); }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor="#c70f66">
          <Text style={styles.buttonTitle}>送信する</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SignupScreen;
