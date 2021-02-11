import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
import {allArticles} from '../../data/test/sampleData';
import {NavigationBar} from '../components';
import {Images} from '../assets';

const Bookmark = ({navigation}: HomeNavigationProps<'Bookmark'>) => {
  const theme = useTheme();

  const newsList = () => {
    var news: any = allArticles;

    const renderItem = ({item}: any) => {
      return (
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
        />
      </Box>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Size.paddings.l,
        backgroundColor: theme.colors.background2,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box flex={1}>
        <Box height={70}>
          <NavigationBar title="Bookmark" />
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

export default Bookmark;
