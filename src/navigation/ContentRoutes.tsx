import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {Setting, Bookmark, ArticleDetails} from '../home';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const ContentRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'News'}>
      {/* Tabs */}
      <Stack.Screen name="News" component={Tabs} />

      {/* Screens */}
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bookmark"
        component={Bookmark}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ContentRoutes;
