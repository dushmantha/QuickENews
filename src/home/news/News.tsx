import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Box, useTheme, Size, CategoriesContext} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
import {Images} from '../assets';
import {BannerAdSize} from '@react-native-firebase/admob';
import {Banner} from '../../ads/';
import {News as NewsType} from '../../types';
import {NavigationBar, NewsList} from '../components';
import {useNewsGetByCategory, useBreakingNews} from '../../services';

const BreakingNewsSection = ({navigation}: any) => {
  const renderItem = ({item, index}: any) => {
    return (
      <Box alignItems="center" flexDirection="row">
        {(index + 1) % 4 === 0 && (
          <Box paddingHorizontal="m" alignItems="center">
            <Banner bannerAdSize={BannerAdSize.MEDIUM_RECTANGLE as any} />
          </Box>
        )}
        <TouchableOpacity
          style={{
            flex: 1,
            paddingHorizontal: Size.paddings.s,
          }}
          onPress={() =>
            navigation.navigate('ArticleDetails', {
              news: item,
            })
          }>
          <FastImage
            source={{
              uri: item.image.src,
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
          keyExtractor={(_, index) => index.toString()}
          data={useBreakingNews()}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

const News = ({navigation}: HomeNavigationProps<'News'>) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('1');
  let category = useContext(CategoriesContext).map(({title, _id}) => {
    return {title: title, id: _id};
  });
  const categoryHeaders = () => {
    const renderItem = ({item}: any) => {
      return (
        <TouchableOpacity
          style={{flex: 1, marginRight: Size.paddings.l}}
          onPress={() => setSelectedCategory(item.id)}>
          {selectedCategory === item.id ? (
            <Text variant="title2" color="background2">
              {item.title}
            </Text>
          ) : (
            <Text variant="title2" color="lightGray">
              {item.title}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <Box flex={1} paddingLeft="l">
        <FlatList
          data={category}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
        />
      </Box>
    );
  };
  //allNews[Math.floor(Math.random() * allNews.length)];
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
          <Box>
            <NewsList
              navigation={navigation}
              news={
                useNewsGetByCategory(selectedCategory as string) as [NewsType]
              }
            />
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default News;
