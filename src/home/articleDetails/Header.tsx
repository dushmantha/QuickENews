import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import Animated from 'react-native-reanimated';
import {withTimingTransition, useValue} from 'react-native-redash';
import Icon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import {Box, useTheme, Size} from '../../components';
import {News} from '../../types';
import {setBookmark, useGetBookmark, deleteBookmark} from '../../services';
import bookmarked from './assets/bookmarked.png';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {
  interpolateNode,
  Extrapolate,
  useCode,
  greaterThan,
  set,
  block,
} = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

interface HeaderProps {
  y: Animated.Value<number>;
  goBack: () => void;
  news: News;
}

export default ({y, goBack, news}: HeaderProps) => {
  const theme = useTheme();
  const toggle = useValue<0 | 1>(0);
  const transition = withTimingTransition(toggle, {duration: 100});
  const insets = useSafeAreaInsets();
  const {top: paddingTop} = insets;
  const translateX = interpolateNode(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const headerHeight = isIphoneX() ? 10 : 50;
  const translateY = interpolateNode(y, {
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + headerHeight,
      -10,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);
  const [bookmarkNews, setBookmarkNews] = useState(false);
  let obj = useGetBookmark().find((o: any) => o.news._id === news._id);
  useEffect(() => {
    setBookmarkNews(obj ? true : false);
  }, [obj]);
  const clickBookmark = () => {
    obj && bookmarkNews ? deleteBookmark(obj._id) : setBookmark(news);
    setBookmarkNews(!bookmarkNews);
  };
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: 'white',
        }}
      />
      <Box
        flexDirection="row"
        height={MIN_HEADER_HEIGHT}
        alignItems="center"
        paddingHorizontal="l">
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={ICON_SIZE} color="white" />
          <Animated.View
            style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
            <Icon name="arrow-left" size={ICON_SIZE} color="black" />
          </Animated.View>
        </TouchableOpacity>

        <Animated.Text
          numberOfLines={2}
          style={[
            theme.textVariants.title3,
            {
              transform: [{translateX}, {translateY}],
              flex: 1,
              marginLeft: Size.paddings.m,
              color: theme.colors.background2,
            },
          ]}>
          {news.title}
        </Animated.Text>
        <TouchableOpacity onPress={clickBookmark}>
          <Box height={25} width={25}>
            {bookmarkNews ? (
              <Image style={{width: 25, height: 25}} source={bookmarked} />
            ) : (
              <Icon name="bookmark" size={ICON_SIZE} color="white" />
            )}
          </Box>
          <Animated.View
            style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
            <Icon name="bookmark" size={ICON_SIZE} color="black" />
          </Animated.View>
        </TouchableOpacity>
      </Box>
      <TabHeader {...{transition, news}} />
    </Animated.View>
  );
};
