/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, SafeAreaView, useWindowDimensions} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {BannerAdSize} from '@react-native-firebase/admob';
import HTML from 'react-native-render-html';
import {Banner} from '../../ads/';
import {Text, Box, useTheme} from '../../components';
import {News} from '../../types';
import {NavigationBar, NewsList} from '../components';
import {useNewsGetByCategory} from '../../services';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';
import profileImage from './assets/profile.png';

export interface TabModel {
  name: string;
  anchor: number;
  profile: string;
}

interface ContentProps {
  y: Animated.Node<number>;
  navigation: any;
  news: News;
}

export default ({y, navigation, news}: ContentProps) => {
  const theme = useTheme();
  const contentWidth = useWindowDimensions().width;
  const opacity = interpolateNode(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 170,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Box>
      <Box height={HEADER_IMAGE_HEIGHT} marginBottom="xl" />
      <Animated.View style={[styles.section, {opacity}]}>
        <Box flexDirection="row" alignItems="center">
          <Animated.Image
            source={
              news.authorProfileImageUrl
                ? {uri: news.authorProfileImageUrl}
                : profileImage
            }
            style={{width: 50, height: 50, borderRadius: 30}}
          />
          <Box marginLeft="m" flex={1}>
            <Text variant="title3" color="background2">
              {news.author_name}
            </Text>
          </Box>
        </Box>
        {news.attachment && (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s">
            <Text variant="body" color="background2">
              {news.attachment}
            </Text>
            <Box flexDirection="row" alignItems="center">
              <Icon
                name="paperclip"
                color={theme.colors.background2}
                size={20}
                style={styles.icon}
              />
            </Box>
          </Box>
        )}
        {news.author_twitter && (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s">
            <Text variant="body2" color="background2">
              {news.author_twitter}
            </Text>
          </Box>
        )}
        {news.author_emails && (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop="s">
            <Text variant="body2" color="background2">
              {news.author_emails}
            </Text>
          </Box>
        )}
      </Animated.View>
      <Box marginBottom="l" marginHorizontal="m">
        <HTML source={{html: news.description}} contentWidth={contentWidth} />
      </Box>

      <Box paddingVertical="m" alignItems="center">
        <Banner bannerAdSize={BannerAdSize.MEDIUM_RECTANGLE as any} />
      </Box>
      <Box marginVertical="l">
        <RecommendedNews navigation={navigation} news={news} />
      </Box>
    </Box>
  );
};

const RecommendedNews = ({navigation, news}: {navigation: any; news: News}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Box flex={1}>
        <Box height={70}>
          <NavigationBar title="Recommended News" />
        </Box>
        <Box>
          <NewsList
            navigation={navigation}
            news={useNewsGetByCategory(news.category_id) as [News]}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    padding: 16,
  },
  icon: {
    marginRight: 8,
  },
});
