/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


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
    this.navigateToSignup = this.navigateToSignup.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
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
        this.navigateToLogin();
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

                this.navigateToSignup();
              })
              .catch();
          },
        },
      ],
      // eslint-disable-next-line comma-dangle
      { cancelable: false }
    );
  }

  navigateToSignup() {
    // 画面遷移の履歴をリセット。これでログイン前画面まで戻らない。
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Signup' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  navigateToLogin() {
    // 画面遷移の履歴をリセット。これでログイン前画面まで戻らない。
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

    this.props.navigation.dispatch(resetAction);
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
