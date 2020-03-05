import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

import firebase from 'firebase';
import ENV from './env.json';

import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';

// Required for side-effects
require('firebase/firestore');

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
    MemoCreate: {
      screen: MemoCreateScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: 'MEMO-APP',
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: '#265356',
        ...Platform.select({
          android: {
            height: 80,
            paddingTop: 16,
          },
        }),
      },
      headerTitleStyle: {
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
      },
      headerTintColor: '#fff',
      headerBackTitle: null,
    },
    // eslint-disable-next-line comma-dangle
  }
);

export default createAppContainer(AppNavigator);
