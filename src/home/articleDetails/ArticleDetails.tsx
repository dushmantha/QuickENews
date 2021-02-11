import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {CommonActions} from '@react-navigation/native';

import {onScrollEvent, useValue} from 'react-native-redash';
import {HomeNavigationProps} from '../../components/Navigation';
import HeaderImage from './HeaderImage';
import Content, {TabModel} from './Content';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ArticleDetails = ({
  navigation,
}: HomeNavigationProps<'ArticleDetails'>) => {
  const goBack = () => {
    navigation.goBack();
  };
  const scrollView = useRef<Animated.ScrollView>(null);
  const [tabs, setTabs] = useState([].map(() => ({anchor: 0})));
  const tabModel: TabModel = {
    anchor: 0,
    name: 'user name',
    profile: '',
  };
  const y = useValue(0);
  const onScroll = onScrollEvent({y});
  return (
    <View style={styles.container}>
      <HeaderImage {...{y}} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        {...{onScroll}}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{y}}
        />
      </Animated.ScrollView>
      <Header {...{y, tabModel, goBack}} />
    </View>
  );
};

export default ArticleDetails;
