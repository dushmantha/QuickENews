import React from 'react';
import {Dimensions, Switch, FlatList} from 'react-native';
import {Text, Box, Button, useTheme} from '../../components';
const {width} = Dimensions.get('window');

const DataUsage = () => {
  const theme = useTheme();
  const itemList = [
    {
      title: 'Automatic Refresh',
      id: 1,
      subTitle:
        'Turning off automatic refresh will prevent content from updating automatically. Pull to refresh on any section front to get new content',
    },
    {
      title: 'Download Images',
      id: 2,
      subTitle:
        'Turning off images will prevent all images form displaying on section fronts to reduce data usage.',
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <Box margin="s">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginTop="l"
          flex={1}>
          <Box flex={0.9}>
            <Text variant="body3">{item.title}</Text>
            <Text>{item.subTitle}</Text>
          </Box>
          <Box flex={0.1} marginHorizontal="s">
            <Switch
              style={{alignSelf: 'center'}}
              trackColor={{
                true: theme.colors.background2,
                false: theme.colors.lightGray,
              }}
              onValueChange={() => {}}
              value={true}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center" alignSelf="center">
      <Box borderColor="background2" borderRadius="s" borderWidth={0.5}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={itemList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
        <Box alignItems="center" marginVertical="m">
          <Button onPress={() => {}} label="Clear Cache" />
        </Box>
      </Box>
    </Box>
  );
};

export default DataUsage;
