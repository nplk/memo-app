import React from 'react';
import {
  StyleSheet, View, Text, TouchableHighlight, FlatList, TouchableOpacity, Alert,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

const styles = StyleSheet.create({
  memoList: {
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});


const DeleteButton = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={{
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: '100%',
      }}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>削除</Text>
    </View>
  </TouchableOpacity>
);

class MemoList extends React.Component {
  renderMemo = ({ item }) => {
    const swipeoutBtns = [
      {
        backgroundColor: '#fff',
        component: (
          <DeleteButton
            onPress={() => {
              Alert.alert(
                '削除しますか？',
                '',
                [
                  {
                    text: 'キャンセル',
                    style: 'cancel',
                  },
                  {
                    text: '削除する',
                    onPress: () => {
                      console.log('deleted');
                      this.props.delete(item.key);
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
          />
        ),
      },
    ];

    return (
      <Swipeout
        right={swipeoutBtns}
        autoClose
      >
        <TouchableHighlight onPress={() => { this.props.navigation.navigate('MemoDetail', { memo: item }); }}>
          <View style={styles.memoListItem}>
            <Text style={styles.memoTitle}>{item.body.split(20)}</Text>
            <Text style={styles.memoDate}>{item.createdOn}</Text>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  render() {
    return (
      <View style={styles.memoList}>
        <FlatList
          data={this.props.memoList}
          renderItem={this.renderMemo}
        />
      </View>
    );
  }
}

export default MemoList;
