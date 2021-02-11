import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
import {Images} from '../assets';

import {
  allArticles,
  businessArticle,
  scienceAndTechArticle,
  politicsArticle,
  entertainment,
  breakingNews,
  newsCategory,
} from '../../data/test/sampleData';

const allNews = [
  allArticles,
  businessArticle,
  scienceAndTechArticle,
  politicsArticle,
  entertainment,
];
import {NavigationBar} from '../components';

const BreakingNewsSection = ({navigation}: any) => {
  const renderItem = ({item, index}: any) => {
    return (
      <Box alignItems="center">
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? Size.paddings.l : 0,
            marginRight: Size.paddings.l,
          }}
          onPress={() =>
            // navigation.navigate("ArticleDetails", {
            //   news: item,
            // })
            navigation.navigate('ArticleDetails')
          }>
          <FastImage
            source={{
              uri: item.urlToImage,
              priority: FastImage.priority.normal,
            }}
            resizeMode="cover"
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
            }}
          />
          <Box marginTop="l" width={180} alignItems="center">
            <Text
              variant="title3"
              color="background2"
              numberOfLines={1}
              textAlign="center">
              {item.title}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <Box flex={1}>
      <Box
        paddingHorizontal="l"
        flexDirection="row"
        justifyContent="space-between">
        <Text variant="title2" color="background2">
          Breaking News
        </Text>
      </Box>
      <Box flex={1} marginTop="l">
        <FlatList
          data={breakingNews.articles}
          renderItem={renderItem}
          keyExtractor={(item: any) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

const News = ({navigation}: HomeNavigationProps<'News'>) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState(newsCategory);

  const categoryHeaders = () => {
    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          style={{flex: 1, marginRight: Size.paddings.l}}
          onPress={() => setSelectedCategory(item.id)}>
          {selectedCategory == item.id ? (
            <Text variant="title2" color="background2">
              {item.name}
            </Text>
          ) : (
            <Text variant="title2" color="lightGray">
              {item.name}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <Box flex={1} paddingLeft="l">
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </Box>
    );
  };

  const newsList = () => {
    var news: any = [];

    let selectedCategoryNews = categories.filter(
      (a: any) => a.id == selectedCategory,
    );

    if (selectedCategoryNews.length > 0) {
      news = allNews[Math.floor(Math.random() * allNews.length)];
    }

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
          <NavigationBar title="QuickENews" image={Images.notification} />
        </Box>
        {/* body section */}
        <ScrollView
          style={{
            paddingVertical: Size.paddings.l,
            backgroundColor: theme.colors.background,
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Hot and breaking news */}
          <Box>
            <BreakingNewsSection navigation={navigation} />
          </Box>
          {/* News Categories Section */}
          <Box marginTop="l">{categoryHeaders()}</Box>
          {/* News list Section */}
          <Box>{newsList()}</Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default News;
