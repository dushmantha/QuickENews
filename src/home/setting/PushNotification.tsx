import React from 'react';
import {Dimensions, Switch, SectionList} from 'react-native';
import {Text, Box, useTheme} from '../../components';
const {width} = Dimensions.get('window');

const PushNotification = () => {
  const theme = useTheme();
  const sectionList = [
    {
      header: 'GET CAUGHT UP',
      data: [
        {
          title: 'Breaking New',
          subTitle: 'Urgent and important stories',
          id: 1,
          on: true,
        },
        {
          title: 'Morning Briefing',
          subTitle: 'What you need to know to start your day',
          id: 1,
          on: false,
        },
        {
          title: 'Evening Briefing',
          subTitle: 'A rundown of the day top stories',
          id: 1,
          on: false,
        },
      ],
    },
    {
      header: 'GENERAL',
      data: [
        {
          title: 'Politics',
          subTitle: 'Fearless coverage',
          id: 1,
          on: true,
        },
        {
          title: 'Business & Technology',
          subTitle: 'Market-moving nes and feature',
          id: 1,
          on: false,
        },
        {
          title: 'Sport',
          subTitle: 'Scores, live updates and great reads',
          id: 1,
          on: false,
        },
      ],
    },
    {
      header: 'LIVE COVERAGE',
      data: [
        {
          title: 'Live Politics Update',
          subTitle: 'Never miss a thing',
          id: 1,
          on: true,
        },
        {
          title: 'Covid-19',
          subTitle: 'Health',
          id: 1,
          on: false,
        },
      ],
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <Box
        margin="s"
        flexDirection="row"
        justifyContent="space-between"
        alignContent="space-between">
        <Box>
          <Text variant="body2" paddingStart="s" color="background2">
            {item.title}
          </Text>
          <Text variant="body" paddingStart="s" color="background2">
            {item.subTitle}
          </Text>
        </Box>
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
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center">
      <Box borderColor="background2" borderRadius="l" borderWidth={0.5}>
        <SectionList
          sections={sectionList}
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
