import React from 'react';
import {Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {Box} from '../../components';
const {width} = Dimensions.get('window');
import {HomeNavigationProps} from '../../components/Navigation';
const About = ({route}: HomeNavigationProps<'About'>) => {
  const {url} = route.params;
  console.log('print 00000', url);
  return (
    <Box padding="m" width={width} flex={1}>
      <WebView style={{flex: 1}} source={url} useWebKit={true} />
    </Box>
  );
};

export default About;
