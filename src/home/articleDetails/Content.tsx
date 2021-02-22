/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Banner} from '../../ads/';

import {Text, Box, useTheme, Size} from '../../components';
import {NavigationBar, NewsList} from '../components';
import {allArticles} from '../../data/test/sampleData';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';

const profile = require('./assets/profile.jpg');

export interface TabModel {
  name: string;
  anchor: number;
  profile: string;
}

interface ContentProps {
  y: Animated.Node<number>;
  onMeasurement: (index: number, tab: TabModel) => void;
  navigation: any;
}

export default ({y, navigation}: ContentProps) => {
  const theme = useTheme();
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
            source={profile}
            style={{width: 60, height: 60, borderRadius: 30}}
          />
          <Text marginStart="m" variant="title3" color="background2">
            George Boyle
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="s">
          <Text variant="body" color="background2">
            Attached pdf here
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
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="s">
          <Text variant="body2" color="background2">
            @twitter
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="s">
          <Text variant="body2" color="background2">
            george@gmail.com
          </Text>
        </Box>
      </Animated.View>
      <Text marginBottom="l" marginHorizontal="m" variant="body">
        {allArticles.articles[0].description}
      </Text>
      <Box paddingVertical="m" alignItems="center">
        <Banner bannerAdSize={BannerAdSize.MEDIUM_RECTANGLE as any} />
      </Box>
      <Box marginVertical="l">
        <RecommendedNews navigation={navigation} />
      </Box>
    </Box>
  );
};

const RecommendedNews = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Box flex={1}>
        <Box height={70}>
          <NavigationBar title="Recommended News" />
        </Box>
        {/* body section */}
        <ScrollView
          style={{
            paddingVertical: Size.paddings.l,
            backgroundColor: theme.colors.background,
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {/* News list Section */}
          <Box>
            <NewsList
              navigation={navigation}
              news={allArticles}
              isBookmark={false}
            />
          </Box>
        </ScrollView>
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
