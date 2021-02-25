import React from 'react';
import {Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {Box} from '../../components';
const {width} = Dimensions.get('window');

const About = () => {
  return (
    <Box padding="m" width={width} flex={1}>
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://feathericons.com/?query=ch'}}
      />
    </Box>
  );
};

export default About;
