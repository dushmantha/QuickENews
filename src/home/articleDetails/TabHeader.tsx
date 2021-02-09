import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Box} from '../../components';
import Animated from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';

import Tabs from './Tabs';
import {TabModel} from './Content';

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
  tab: TabModel;
}

export default ({transition, tab}: TabHeaderProps) => {
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
        <Tabs {...{tab}} />
      </Animated.View>
      <Box>
        <Animated.View
          style={[
            style,
            Platform.OS === 'android'
              ? {
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                }
              : {},
          ]}
        />
      </Box>
      {Platform.OS === 'ios' && (
        <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
            }}>
            <Tabs {...{tab}} />
          </Animated.View>
        </MaskedView>
      )}
    </Animated.View>
  );
};
