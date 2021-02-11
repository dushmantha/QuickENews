/* eslint-disable max-len */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

import {Text, Box, useTheme, Size} from '../../components';
import {NavigationBar} from '../components';
import {Images} from '../assets';
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
}

export default ({y}: ContentProps) => {
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
      <Box marginVertical="l">
        <RecommendedNews />
      </Box>
    </Box>
  );
};

const RecommendedNews = () => {
  const theme = useTheme();
  const newsList = () => {
    var news: any = allArticles;
    const renderItem = ({item}: any) => {
      return (
        <Box marginVertical="s" flex={1} flexDirection="row">
          <Box flex={0.9}>
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {}}>
              <FastImage
                source={{
                  uri: item.urlToImage,
                  priority: FastImage.priority.normal,
                }}
                resizeMode="cover"
                style={{width: 100, height: 150, borderRadius: 10}}
              />

              <Box flex={1} marginLeft="m">
                <Box paddingRight="l">
                  <Text variant="title3" color="background2">
                    {item.title}
                  </Text>
                  <Text variant="title3" color="lightGray" marginTop="s">
                    {item.author}
                  </Text>
                </Box>
                <Box flexDirection="row" marginTop="s">
                  <Text
                    paddingRight="l"
                    variant="body4"
                    color="grayFont"
                    numberOfLines={4}>
                    {item.description}
                  </Text>
                </Box>

                {/* Genre */}
              </Box>
            </TouchableOpacity>
          </Box>
          {/* Bookmark Button */}
          <Box flex={0.1}>
            <TouchableOpacity
              style={{position: 'absolute', top: 5, right: 15}}
              onPress={() => console.log('Bookmark')}>
              <Image
                source={Images.bookmark}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: theme.colors.lightGray,
                }}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      );
    };

    return (
      <Box flex={1} marginTop="m" marginLeft="m" paddingBottom="m">
        <FlatList
          data={news.articles}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </Box>
    );
  };

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
          <Box>{newsList()}</Box>
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
