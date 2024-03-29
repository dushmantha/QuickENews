import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
import {NavigationBar, NewsList} from '../components';
import {useGetBookmark} from '../../services';
const Bookmark = ({navigation}: HomeNavigationProps<'Bookmark'>) => {
  const theme = useTheme();
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
          <Box>
            <NewsList
              navigation={navigation}
              news={useGetBookmark().map(({news}) => news)}
            />
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Bookmark;
