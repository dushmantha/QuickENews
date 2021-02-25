import React, {useState} from 'react';
import {Dimensions, ScrollView, Switch} from 'react-native';
import {Slider} from 'react-native-elements';
import {Text, Box, useTheme} from '../../components';
import Icon from 'react-native-vector-icons/Feather';
const {width} = Dimensions.get('window');

const DisplaySetting = () => {
  const theme = useTheme();
  const [value, setValue] = useState(10);

  const TextSize = () => {
    return (
      <Box borderColor="background2" borderRadius="l" borderWidth={0.5}>
        <Box marginVertical="l" margin="m">
          <Text variant="title3">TEXT SIZE</Text>
          <Box flexDirection="row" justifyContent="space-between" marginTop="l">
            <Box>
              <Text>Use System Text Size</Text>
              <Text>Switch off to set text size for this app below</Text>
            </Box>
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
          <Box marginVertical="l" flexDirection="row" alignItems="center">
            <Text variant="body">A</Text>
            <Slider
              style={{flex: 1, marginHorizontal: theme.spacing.m}}
              value={value}
              onValueChange={() => setValue(value)}
              maximumValue={50}
              minimumValue={20}
              step={1}
              trackStyle={{height: 5, backgroundColor: 'transparent'}}
              thumbStyle={{
                height: 20,
                width: 20,
                backgroundColor: 'transparent',
              }}
              thumbProps={{
                children: (
                  <Icon
                    name="type"
                    size={20}
                    color={theme.colors.background2}
                  />
                ),
              }}
            />
            <Text variant="title2">A</Text>
          </Box>
        </Box>
      </Box>
    );
  };

  const TextPreview = () => {
    return (
      <Box
        borderColor="background2"
        borderRadius="l"
        borderWidth={0.5}
        marginTop="l">
        <Box marginVertical="l" margin="m">
          <Text variant="title3">TEXT SIZE</Text>
          <Box flexDirection="row" justifyContent="space-between" marginTop="l">
            <Box>
              <Text variant="title1">Welcome to the Buckshee news app</Text>
              <Text variant="body2">
                The aim of the Buckshee is to give the new, all the news
              </Text>
              <Text variant="body">New Zealand, Wellington</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center">
      <ScrollView bounces={false}>
        <TextSize />
        <TextPreview />
      </ScrollView>
    </Box>
  );
};

export default DisplaySetting;
