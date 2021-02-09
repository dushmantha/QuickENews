import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Box} from '../../components';
import Tab from './Tab';
import {TabModel} from './Content';

interface TabsProps {
  tab: TabModel;
  active?: boolean;
}

export default ({tab}: TabsProps) => (
  <Box style={{...StyleSheet.absoluteFillObject}} flexDirection="row">
    <Tab {...tab} />
  </Box>
);
