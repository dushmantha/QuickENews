import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../components';
// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {
  ArticleDetails,
  Setting,
  Bookmark,
  About,
  Questions,
  AutoPlay,
  DataUsage,
  DisplaySetting,
  PushNotification,
} from '../home';
import Tabs from './Tabs';

const Stack = createStackNavigator();

const ContentRoutes = () => {
  const theme = useTheme();
  const screenOption = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerTintColor: theme.colors.white,
    headerStyle: {
      backgroundColor: theme.colors.background2,
    },
  };
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
      <Stack.Screen
        name="PushNotification"
        component={PushNotification}
        options={screenOption}
      />
      <Stack.Screen
        name="DisplaySetting"
        component={DisplaySetting}
        options={screenOption}
      />
      <Stack.Screen
        name="DataUsage"
        component={DataUsage}
        options={screenOption}
      />
      <Stack.Screen
        name="Autoplay"
        component={AutoPlay}
        options={screenOption}
      />
      <Stack.Screen name="About" component={About} options={screenOption} />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={screenOption}
      />
    </Stack.Navigator>
  );
};

export default ContentRoutes;
