/* eslint-disable arrow-parens */
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import firebase from 'firebase';
import Loading from '../elements/Loading';


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
    backgroundColor: '#265356',
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
  signup: {
    marginTop: 48,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
});

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
  }

  async componentDidMount() {
    const email = await SecureStore.getItemAsync('email');
    const password = await SecureStore.getItemAsync('password');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.navigateToHome();
      })
      .catch(() => {
      });
  }

  navigateToHome() {
    // 画面遷移の履歴をリセット。これでログイン前画面まで戻らない。
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmitLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        SecureStore.setItemAsync('email', this.state.email);
        SecureStore.setItemAsync('password', this.state.password);
        this.navigateToHome();
      })
      .catch(() => {
      });
  }

  handleSubmitSignup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ログイン</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmitLogin}
          underlayColor="#1e4245"
        >
          <Text style={styles.buttonTitle}>ログインする</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.signup}
          onPress={this.handleSubmitSignup}
        >
          <Text style={styles.signupText}>新規会員登録</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;
