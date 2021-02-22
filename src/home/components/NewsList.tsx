import React from 'react';
import {TouchableOpacity, Image, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Banner} from '../../ads/';
import {Text, Box, useTheme} from '../../components';
import {Images} from '../assets';

type NewsListProps = {
  news: any;
  navigation: any;
  isBookmark: Boolean;
};

const NewsList = ({news, navigation, isBookmark}: NewsListProps) => {
  const theme = useTheme();
  const renderItem = ({item, index}: any) => {
    return (
      <Box alignItems="center">
        {(index + 1) % 4 === 0 && (
          <Box paddingVertical="m" alignItems="center">
            <Banner bannerAdSize={BannerAdSize.LARGE_BANNER as any} />
          </Box>
        )}
        <Box marginVertical="s" flex={1} flexDirection="row">
          <Box flex={0.9}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => navigation.navigate('ArticleDetails')}>
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
            <TouchableOpacity onPress={() => console.log('Bookmark')}>
              <Image
                source={Images.bookmark}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: theme.colors.background2,
                }}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} marginTop="m" marginHorizontal="m" paddingBottom="m">
      {!isBookmark && (
        <Box alignItems="center">
          <Banner bannerAdSize={BannerAdSize.BANNER as any} />
        </Box>
      )}
      <FlatList
        keyExtractor={(item) => item.key}
        data={news.articles}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default NewsList;
