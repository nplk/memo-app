import React from 'react';
import {
  StyleSheet, View, TextInput,
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

class MemoEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      key: '',
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      title: params.title,
      body: params.body,
      key: params.key,
    });
  }

  handleSubmit = () => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = firebase.firestore.Timestamp.now();

    db.collection(`users/${currentUser.uid}/memos`)
      .doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
      .then(() => {
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          title: this.state.title,
          body: this.state.body,
          key: this.state.key,
          createdOn: newDate.toDate().toISOString().split('T')[0],
        });
        navigation.goBack();
      })
      .catch(() => {
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body: text }); }}
        />

        <CircleButton
          name="check"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default MemoEditScreen;
