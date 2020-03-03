/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import firebase from 'firebase';
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
    this.state = {
      memoList: [],
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/memos`)
      .get()
      .then((querySnapshot) => {
        const memoList = [];
        querySnapshot.forEach((doc) => {
          memoList.push({ ...doc.data(), key: doc.id, createdOn: doc.data().createdOn.toDate().toISOString().split('T')[0] });
        });
        this.setState({ memoList });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  handlePress() {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
        <CircleButton
          name="plus"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

export default MemoListScreen;
