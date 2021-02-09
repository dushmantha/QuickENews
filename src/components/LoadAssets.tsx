import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InitialState, NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-$123`;

interface LoadAssetsProps {
  children: ReactElement | ReactElement[];
}

const LoadAssets = ({children}: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY,
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );
  return (
    <NavigationContainer {...{onStateChange, initialState}}>
      <StatusBar style="light" />
      {children}
    </NavigationContainer>
  );
};

export default LoadAssets;
