import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: MemoListScreen,
    },
    MemoDetail: {
      screen: MemoDetailScreen,
    },
    MemoEdit: {
      screen: MemoEditScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'MEMOT',
      headerStyle: {
        backgroundColor: '#265356',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    },
    // eslint-disable-next-line comma-dangle
  }
);

export default createAppContainer(AppNavigator);
