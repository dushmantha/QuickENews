import React from 'react';
import {TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import {Text, Box, useTheme} from '../../components';

type NavigationBarProps = {
  title: string;
  image?: ImageSourcePropType;
};

const NavigationBar = ({image = {}, title}: NavigationBarProps) => {
  const theme = useTheme();
  return (
    <Box
      flex={1}
      flexDirection="row"
      paddingHorizontal="l"
      alignItems="center"
      backgroundColor="background2">
      <Box flex={1}>
        <Box marginRight="l">
          <Text variant="title1" color="white">
            {title}
          </Text>
        </Box>
      </Box>
      {/* Tab bar icon */}
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          console.log('Point');
        }}>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: theme.colors.white,
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default NavigationBar;
