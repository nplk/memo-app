import React from 'react';
import {
  StyleSheet, View, TextInput, ScrollView, KeyboardAvoidingView,
} from 'react-native';

import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

class MemoCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth(); // 現在ログインしているユーザーを取得

    db.collection(`users/${currentUser.uid}/memos`).add({
      body: this.state.body,
      createdOn: new Date(),
      title: 'Hello',
    })
      .then(() => {
        this.props.navigation.goBack();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        keyboardVerticalOffset={80}
      >
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }); }}
          textAlignVertical="top"
        />
        <CircleButton name="check" onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default MemoCreateScreen;
