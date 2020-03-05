/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';
import TextButton from '../elements/TextButton';

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
    this.state = {
      memoList: [],
    };
    this.handleAddPress = this.handleAddPress.bind(this);
    this.handleLogoutPress = this.handleLogoutPress.bind(this);
    this.handleMemoDeletePress = this.handleMemoDeletePress.bind(this);
    this.handleUserDeletePress = this.handleUserDeletePress.bind(this);
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`)
      .orderBy('createdOn', 'desc')
      .onSnapshot(snapshot => {
        const memoList = [];
        snapshot.forEach(doc => {
          memoList.push({
            ...doc.data(),
            key: doc.id,
            createdOn: doc
              .data()
              .createdOn.toDate()
              .toISOString()
              .split('T')[0],
          });
        });
        this.setState({ memoList });
      });
  }

  handleMemoDeletePress(key) {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`users/${currentUser.uid}/memos`)
      .doc(key)
      .delete()
      .then(() => {
        const memoListTmp = [...this.state.memoList];
        // eslint-disable-next-line array-callback-return
        memoListTmp.some((item, index) => {
          if (item.key === key) {
            memoListTmp.splice(index, 1);
            this.setState({ memoList: memoListTmp });
          }
        });
      })
      .catch();
  }

  // eslint-disable-next-line class-methods-use-this
  handleAddPress() {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('MemoCreate');
  }

  handleLogoutPress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await SecureStore.deleteItemAsync('email');
        await SecureStore.deleteItemAsync('password');
        this.props.navigation.navigate('Login');
      })
      .catch(error => {});
  }

  handleUserDeletePress() {
    Alert.alert(
      'アカウントを削除をしますか？',
      '削除したアカウントは復元できません',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除する',
          onPress: () => {
            const { currentUser } = firebase.auth();
            currentUser
              .delete()
              .then(async () => {
                await SecureStore.deleteItemAsync('email');
                await SecureStore.deleteItemAsync('password');

                this.props.navigation.navigate('Signup');
              })
              .catch();
          },
        },
      ],
      // eslint-disable-next-line comma-dangle
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList
          memoList={this.state.memoList}
          navigation={this.props.navigation}
          delete={this.handleMemoDeletePress}
        />
        <CircleButton name="plus" onPress={this.handleAddPress} />
        <TextButton onPress={this.handleUserDeletePress}>退会</TextButton>
        <TextButton onPress={this.handleLogoutPress} left={170}>
          ログアウト
        </TextButton>
      </View>
    );
  }
}

export default MemoListScreen;
