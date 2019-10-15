import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { YellowBox } from 'react-native';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

import Dashboard from './screens/Dashboard';
import Registration from './screens/Registration';
import Profile from './screens/Profile';

YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated']);

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Registration,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
              style: {
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
