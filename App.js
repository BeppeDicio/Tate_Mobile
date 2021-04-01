import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UsersView from "./src/views/UsersView";

const switchNavigator = createSwitchNavigator({

  mainFlow: createBottomTabNavigator({
    UsersView: UsersView,
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
        <App/>
  );
};
