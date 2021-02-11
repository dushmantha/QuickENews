import React from 'react';
import {Image, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import {Box, Text, useTheme} from '../components/Theme';
import {Button} from '../components';
import {AuthNavigationProps} from '../components/Navigation';
import {Images} from '../assets/images';

const {width} = Dimensions.get('window');
const picture = {
  src: Images.logo,
  width: 100,
  height: 100,
};
export const assets = [picture.src];
const Welcome = ({navigation}: AuthNavigationProps<'Welcome'>) => {
  const theme = useTheme();
  return (
    <Box flex={1} backgroundColor="background">
      <StatusBar hidden={true} />
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="background2"
        alignItems="center"
        justifyContent="flex-end">
        <Image
          source={picture.src}
          style={{
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
          }}
        />
      </Box>
      <Box flex={1} borderTopLeftRadius="xl">
        <Box
          backgroundColor="background2"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor="background"
          borderTopLeftRadius="xl"
          justifyContent="space-evenly"
          alignItems="center"
          flex={1}
          padding="xl">
          <Text variant="title2">Let’s get started</Text>
          <Text variant="body" textAlign="center">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            label="Have an account? Login"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            label="Join us, it’s Free"
            onPress={() => navigation.navigate('SignUp')}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text variant="button" color="background2">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
