import React from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Banner} from '../../ads/';
import {Text, Box} from '../../components';
import {News} from '../../types';

type NewsListProps = {
  news: News[];
  navigation: any;
};

const NewsList = ({news, navigation}: NewsListProps) => {
  const renderItem = ({item, index}: {item: News; index: number}) => {
    return (
      <Box alignItems="center">
        {(index + 1) % 4 === 0 && (
          <Box paddingVertical="m" alignItems="center">
            <Banner bannerAdSize={BannerAdSize.MEDIUM_RECTANGLE as any} />
          </Box>
        )}
        <Box marginVertical="s" flex={1} flexDirection="row">
          <Box flex={1}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() =>
                navigation.navigate('ArticleDetails', {
                  news: item,
                })
              }>
              <FastImage
                source={{
                  uri: item.image && item.image.src,
                  priority: FastImage.priority.normal,
                }}
                resizeMode="cover"
                style={{width: 100, height: 150, borderRadius: 10}}
              />

              <Box flex={1} marginLeft="m">
                <Box paddingRight="l">
                  <Text variant="title3" color="background2" numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.author_name && (
                    <Text variant="title3" color="lightGray" marginVertical="s">
                      {item.author_name}
                    </Text>
                  )}
                </Box>
                <Box flexDirection="row">
                  <Text numberOfLines={4}>{item.description}</Text>
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} marginTop="m" marginHorizontal="m" paddingBottom="m">
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={news}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default NewsList;
