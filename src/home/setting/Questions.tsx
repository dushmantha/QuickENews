import React from 'react';
import {Dimensions, TextInput} from 'react-native';
import {Box, Button, useTheme} from '../../components';
const {width} = Dimensions.get('window');

const Questions = () => {
  const theme = useTheme();
  return (
    <Box padding="m" width={width} justifyContent="center" alignSelf="center">
      <Box
        borderColor="background2"
        borderRadius="m"
        borderWidth={0.5}
        height={width}>
        <TextInput
          style={{margin: theme.spacing.m}}
          placeholder="Enter your Email"
          onChangeText={() => {}}
          numberOfLines={10}
        />
      </Box>
      <Box alignItems="center" marginVertical="m">
        <Button onPress={() => {}} label="Submit" />
      </Box>
    </Box>
  );
};

export default Questions;
