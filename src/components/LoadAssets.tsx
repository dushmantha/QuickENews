import React, {ReactElement} from 'react';

import {NavigationContainer} from '@react-navigation/native';

interface LoadAssetsProps {
  children: ReactElement | ReactElement[];
}

const LoadAssets = ({children}: LoadAssetsProps) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default LoadAssets;
