import React from 'react';
import Animated from 'react-native-reanimated';

import {Text, Box} from '../../components';
const profile = require('./assets/profile.jpg');

interface TabProps {
  name?: string;
  profile?: string;
}

export default ({}: TabProps) => {
  return (
    <Box
      height={50}
      paddingHorizontal="s"
      justifyContent="center"
      alignItems="center"
      marginRight="s">
      <Box flexDirection="row" alignItems="center">
        <Animated.Image
          source={profile}
          style={{width: 60, height: 60, borderRadius: 30}}
        />
        <Text variant="title3" style={{marginStart: 16}}>
          George Boyle
        </Text>
      </Box>
    </Box>
  );
};
