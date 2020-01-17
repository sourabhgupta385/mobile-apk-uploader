import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SystemAppsScreen from '../screens/SystemAppsScreen';
import NonSystemAppsScreen from '../screens/NonSystemAppsScreen';
import AppOverviewScreen from '../screens/AppOverviewScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleAlign: 'center',
};

const AppNavigator = createStackNavigator(
  {
    AppOverview: {
      screen: AppOverviewScreen,
      navigationOptions: {
        headerTitle: 'APK Uploader',
      },
    },
    NonSystemApps: {
      screen: NonSystemAppsScreen,
      navigationOptions: {
        headerTitle: 'Non System Apps',
      },
    },
    SystemApps: {
      screen: SystemAppsScreen,
      navigationOptions: {
        headerTitle: 'System Apps',
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  },
);

export default createAppContainer(AppNavigator);
