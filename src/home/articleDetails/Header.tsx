import React from 'react';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {withTimingTransition, useValue} from 'react-native-redash';
import Icon from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import {TabModel} from './Content';
import {Box, useTheme, Size} from '../../components';

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
  tabModel: TabModel;
  goBack: () => void;
}

export default ({y, tabModel, goBack}: HeaderProps) => {
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
  const translateY = interpolateNode(y, {
    inputRange: [-100, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT -
        MIN_HEADER_HEIGHT +
        (Platform.OS === 'android' ? 60 : 10),
      0,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
    toggle,
    y,
  ]);
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
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
          <Box>
            <Icon name="arrow-left" size={ICON_SIZE} color="white" />
            <Animated.View
              style={{...StyleSheet.absoluteFillObject, opacity: transition}}>
              <Icon name="arrow-left" size={ICON_SIZE} color="black" />
            </Animated.View>
          </Box>
        </TouchableOpacity>
        <Animated.Text
          style={[
            theme.textVariants.title2,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              transform: [{translateX}, {translateY}],
              flex: 1,
              marginLeft: Size.paddings.l,
            },
          ]}>
          Miss Miu Europaallee
        </Animated.Text>
        <Icon name="bookmark" size={ICON_SIZE} color="white" />
      </Box>
      <TabHeader {...{transition, tabModel}} />
    </Animated.View>
  );
};
