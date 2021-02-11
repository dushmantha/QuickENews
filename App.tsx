/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationNavigator} from './src/authentication';
import {LoadAssets} from './src/components';
import {ThemeProvider} from './src/components/Theme';
import {AppRoutes} from './src/components/Navigation';
import ContentRoutes from './src/navigation/ContentRoutes';
const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  return (
    <ThemeProvider>
      <LoadAssets>
        <SafeAreaProvider>
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
            <AppStack.Screen name="News" component={ContentRoutes} />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
};

export default App;