import React, {ReactNode} from 'react';
import {Dimensions, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';

import {Box} from './Theme';

const {width, height: wHeight} = Dimensions.get('window');
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

const Container = ({children, footer}: ContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <Box
        height={
          wHeight + (Platform.OS === 'android' ? Constants.statusBarHeight : 0)
        }
        backgroundColor="background2">
        <Box backgroundColor="background2">
          <Box
            borderBottomLeftRadius="xl"
            overflow="hidden"
            height={height * 0.61}></Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Box
            borderRadius="xl"
            backgroundColor="background"
            flex={1}
            justifyContent="center"
            padding="xl">
            {children}
          </Box>
        </Box>
        <Box backgroundColor="background2" paddingTop="m">
          {footer}
          <Box height={insets.bottom} />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;
