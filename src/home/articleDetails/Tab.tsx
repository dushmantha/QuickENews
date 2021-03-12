import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {News} from '../../types';
import {Text, Box} from '../../components';
import profileImage from './assets/profile.png';

interface TabProps {
  news: News;
}

export default ({news}: TabProps) => {
  return (
    <Box style={{...StyleSheet.absoluteFillObject}} flexDirection="row">
      <Box
        height={50}
        paddingHorizontal="s"
        justifyContent="center"
        alignItems="center"
        marginRight="s">
        <Box flexDirection="row" alignItems="center">
          <Animated.Image
            source={
              news.authorProfileImageUrl
                ? {uri: news.authorProfileImageUrl}
                : profileImage
            }
            style={{width: 50, height: 50, borderRadius: 30}}
          />
          <Text variant="title3" style={{marginStart: 16}}>
            {news.authorName ? news.authorName : 'Anonymous'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
