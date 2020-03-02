import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from 'firebase';
import ENV from './env.json';

import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
    Home: {
      screen: MemoListScreen,
    },
    MemoDetail: {
      screen: MemoDetailScreen,
    },
    MemoEdit: {
      screen: MemoEditScreen,
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
      headerTintColor: '#fff',
      headerBackTitle: null,
    },
    // eslint-disable-next-line comma-dangle
  }
);

export default createAppContainer(AppNavigator);
