import React from 'react';
import {Dimensions, TouchableOpacity, SectionList} from 'react-native';
import {Text, Box} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
const {width} = Dimensions.get('window');

const GroupList = ({navigation}: any) => {
  const sectionList = [
    {
      title: 'General',
      data: [
        {name: 'Push Notification Settings', id: 1, navigate: true},
        {name: 'Display Settings', id: 2, navigate: true},
        {name: 'Data Usage', id: 3, navigate: true},
        {name: 'Autoplay Videos', id: 4, navigate: true},
      ],
    },
    {
      title: 'Support',
      data: [
        {name: 'Report a Bug', id: 5, navigate: false},
        {name: 'Subscription Question', id: 6, navigate: false},
        {name: 'Report a Nes Error', id: 7, navigate: false},
        {name: 'Call Us', id: 8, navigate: false},
        {name: 'Frequently Asked Question', id: 9, navigate: false},
      ],
    },
    {
      title: 'About',
      data: [
        {name: 'Term of Service', id: 10, navigate: true},
        {name: 'Privacy Policy', id: 11, navigate: true},
        {name: 'Version', id: 12, navigate: false, number: 1.1},
        {name: 'Build', id: 13, navigate: false, number: 2.1},
        {name: 'Frequently Asked Question', id: 14, navigate: true},
      ],
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <Box margin="s">
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
          }}>
          <Text variant="body2" paddingStart="s" color="background2">
            {item.name}
          </Text>
          {item.navigate && (
            <Icon name="chevron-right" size={25} color="background2" />
          )}
          {item.number && (
            <Text variant="body3" marginEnd="s">
              {item.number}
            </Text>
          )}
        </TouchableOpacity>
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
              <Text variant="title2" marginVertical="m" color="background2">
                {section.title}
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

export default GroupList;
