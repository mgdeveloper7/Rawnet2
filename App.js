
 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 *
 */
import React, { Component } from 'react';

import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PostListScreen from './src/screens/PostList'
import PostDetailsScreen from './src/screens/PostDetails'

const RootStack = createStackNavigator({
  PostListScreen: {
    screen: PostListScreen,
  },
  PostDetailsScreen: {
    screen: PostDetailsScreen,
    navigationOptions: ( { navigation }) => ({
      headerBackTitle: 'Back'
    })
  },

},{
  initialRouteName: 'PostListScreen'
});

const App = createAppContainer(RootStack);

export default App;