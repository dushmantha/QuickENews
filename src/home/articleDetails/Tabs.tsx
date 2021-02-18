import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Box} from '../../components';
import Tab from './Tab';
import {TabModel} from './Content';

interface TabsProps {
  tabModel: TabModel;
  active?: boolean;
}

export default ({tabModel}: TabsProps) => (
  <Box style={{...StyleSheet.absoluteFillObject}} flexDirection="row">
    <Tab {...tabModel} />
  </Box>
);
