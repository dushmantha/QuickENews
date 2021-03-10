/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import {AuthenticationNavigator} from './src/authentication';
import {LogBox} from 'react-native';
import {LoadAssets} from './src/components';
import {ThemeProvider} from './src/components/Theme';
import {AppRoutes} from './src/components/Navigation';
import ContentRoutes from './src/navigation/ContentRoutes';
import {AdConsentContext, useAddConfig, AdEnabledContext} from './src/ads';
const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  // const adsEnabled = remoteConfig().getValue('ads_enabled').asBoolean();
  const adsEnabled = true;
  const onAuthStateChanged = (user: any) => {
    setCurrentUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  let adStatus = useAddConfig();
  if (initializing) {
    return null;
  }
  return (
    <ThemeProvider>
      <LoadAssets>
        <SafeAreaProvider>
          <AdEnabledContext.Provider value={adsEnabled}>
            <AdConsentContext.Provider value={adStatus}>
              <AppStack.Navigator headerMode="none">
                {!currentUser && (
                  <AppStack.Screen
                    name="Authentication"
                    component={AuthenticationNavigator}
                  />
                )}
                <AppStack.Screen name="News" component={ContentRoutes} />
              </AppStack.Navigator>
            </AdConsentContext.Provider>
          </AdEnabledContext.Provider>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
};

export default App;
