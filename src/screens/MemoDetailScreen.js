import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CircleButton from '../elements/CircleButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoHeader: {
    height: 100,
    padding: 10,
    backgroundColor: '#17313c',
    justifyContent: 'center',
  },
  memoHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    fontSize: 12,
    color: '#fff',
  },
  memoContent: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 68,
  },
});

class MemoDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: {},
    };
  }


  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({ memo: params.memo });
  }

  // MemoEdit側で呼び出される。送信ボタン押下で編集後メモデータを渡し、MemoDetailScreenの内容を編集後の最新のものに変更する。
  returnMemo = (memo) => {
    this.setState({
      memo,
    });
  }

  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.memoHeader}>
            <View style={styles.memoHeaderContent}>
              <Text style={styles.memoHeaderTitle}>{memo.body}</Text>
              <Text style={styles.memoHeaderDate}>{memo.createdOn}</Text>
            </View>
          </View>
        </View>

        <View style={styles.memoContent}>
          <Text style={styles.memoBody}>{memo.body}</Text>
        </View>

        <CircleButton
          name="pencil"
          color="white"
          style={styles.editButton}
          onPress={() => { this.props.navigation.navigate('MemoEdit', { ...memo, returnMemo: this.returnMemo }); }}
        />
      </View>
    );
  }
}

export default MemoDetailScreen;
