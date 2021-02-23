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
import {AuthenticationNavigator} from './src/authentication';
import {LoadAssets} from './src/components';
import {ThemeProvider} from './src/components/Theme';
import {AppRoutes} from './src/components/Navigation';
import ContentRoutes from './src/navigation/ContentRoutes';
// import {AdsConsent} from '@react-native-firebase/admob';
import {
  adsRequestConfiguration,
  // europeanUserAds,
  // AdConsentContext,
} from './src/ads';
const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  // const [state, setState] = useState(1);

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

  useEffect(() => {
    // const getStatus = async () => {
    //   await europeanUserAds();
    //   setState(await AdsConsent.getStatus());
    //   try {
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // getStatus();
    adsRequestConfiguration();
  });

  if (initializing) {
    return null;
  }
  return (
    <ThemeProvider>
      <LoadAssets>
        <SafeAreaProvider>
          {/* <AdConsentContext.Provider value={state}> */}
          <AppStack.Navigator headerMode="none">
            {!currentUser && (
              <AppStack.Screen
                name="Authentication"
                component={AuthenticationNavigator}
              />
            )}
            <AppStack.Screen name="News" component={ContentRoutes} />
          </AppStack.Navigator>
          {/* </AdConsentContext.Provider> */}
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
};

export default App;
