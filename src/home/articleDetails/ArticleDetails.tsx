import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValue} from 'react-native-redash';
import {HomeNavigationProps} from '../../components/Navigation';
import HeaderImage from './HeaderImage';
import Content from './Content';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ArticleDetails = ({
  navigation,
  route,
}: HomeNavigationProps<'ArticleDetails'>) => {
  const goBack = () => {
    navigation.goBack();
  };
  const {news}: any = route.params;
  const scrollView = useRef<Animated.ScrollView>(null);

  const y = useValue(0);
  const onScroll = onScrollEvent({y});
  return (
    <View style={styles.container}>
      <HeaderImage {...{y, news}} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        {...{onScroll}}>
        <Content {...{y, navigation, news}} />
      </Animated.ScrollView>
      <Header {...{y, goBack, news}} />
    </View>
  );
};

export default ArticleDetails;
