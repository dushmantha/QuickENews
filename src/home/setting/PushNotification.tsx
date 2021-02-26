import React from 'react';
import {Dimensions, Switch, SectionList} from 'react-native';
import {Text, Box, useTheme} from '../../components';
import {pushNotificationSection} from './constants';
const {width} = Dimensions.get('window');

const PushNotification = () => {
  const theme = useTheme();
  const renderItem = ({item}: any) => {
    return (
      <Box
        margin="m"
        flexDirection="row"
        justifyContent="space-between"
        flex={1}
        alignContent="space-between">
        <Box flex={0.9}>
          <Text
            variant="body2"
            paddingStart="s"
            color="background2"
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text
            variant="body"
            paddingStart="s"
            color="background2"
            numberOfLines={5}>
            {item.subTitle}
          </Text>
        </Box>
        <Box flex={0.1}>
          <Switch
            style={{alignSelf: 'center'}}
            trackColor={{
              true: theme.colors.background2,
              false: theme.colors.lightGray,
            }}
            onValueChange={() => {}}
            value={item.on}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center">
      <Box borderColor="background2" borderRadius="m" borderWidth={0.5}>
        <SectionList
          sections={pushNotificationSection}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section}: any) => (
            <Box alignItems="center">
              <Text variant="title2" marginVertical="m">
                {section.header}
              </Text>
            </Box>
          )}
          renderItem={renderItem}
          keyExtractor={(index: any) => index.toString()}
        />
      </Box>
    </Box>
  );
};

export default PushNotification;
