import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import HomeScreen from './HomeScreen';
// import JoinScreen from './JoinScreen'
import NewGameScreen from './NewGameScreen'
import GameboardScreen from './GameboardScreen'
// import StatScreen from "./Stats"
// import SettingsScreen from "./SettingsScreen"
// import PostFetch from "./PostFetch"
// import SplashScreen from 'react-native-splash-screen'
// import SplashAnimation from './SplashAnimation'


import NewGameOptionsScreen from './NewGameOptionsScreen'




const RootStack = createStackNavigator(
  {
    Home: NewGameScreen,
    // Join: JoinScreen,
    // NewGame:NewGameScreen,
    Gameboard:GameboardScreen,
    // GameOptionsScreen: NewGameOptionsScreen,
    // Stats: StatScreen,
    // Settings: SettingsScreen,
    // PostFetch: PostFetch,
    
    // Splash: SplashAnimation
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
  // SplashScreen.hide();
    return <AppContainer />;
  }
}