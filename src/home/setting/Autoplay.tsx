import React, {useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {Text, Box, useTheme} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
const {width} = Dimensions.get('window');

const Autoplay = () => {
  const [selectIndex, setSelectIndex] = useState(0);
  const itemList = [
    {
      title: 'Mobile Data and Wifi Networks',
      index: 0,
    },
    {
      title: 'Wifi Only',
      index: 1,
    },
    {
      title: 'Never Autoplay Video',
      index: 2,
    },
  ];

  const renderItem = ({item, index}: any) => {
    return (
      <Box margin="s">
        <TouchableOpacity onPress={() => setSelectIndex(index)}>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop="l"
            flex={1}>
            <Box flex={0.9}>
              <Text variant="body2">{item.title}</Text>
            </Box>
            <Box alignSelf="center">
              {item.index === selectIndex && (
                <Icon name="check" size={20} color="background2" />
              )}
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center" alignSelf="center">
      <Box alignItems="flex-start">
        <Text variant="body" marginVertical="m">
          Some videos automatically play silently. Choose when your video will
          automatically play.
        </Text>
      </Box>
      <Box borderColor="background2" borderRadius="s" borderWidth={0.5}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={itemList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default Autoplay;
