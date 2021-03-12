import React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from '../../components';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import Tab from './Tab';
import {News} from '../../types';

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 60,
    marginBottom: 8,
    flexDirection: 'row',
  },
});

interface TabHeaderProps {
  transition: Animated.Node<number>;
  news: News;
}

export default ({transition, news}: TabHeaderProps) => {
  const opacity = transition;

  const style = {
    borderRadius: 24,
    width: 400,
    flex: 1,
  };
  const maskElement = <Animated.View {...{style}} />;

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}>
        <Tab {...{news}} />
      </Animated.View>
      <Box>
        <Animated.View style={[style]} />
      </Box>

      <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <Tab {...{news}} />
        </Animated.View>
      </MaskedView>
    </Animated.View>
  );
};
