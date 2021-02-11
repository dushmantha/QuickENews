import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Text} from '../../components';

import SocialLogin from './SocialLogin';

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({onPress, title, action}: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <Box alignItems="center" marginTop="m">
        <TouchableOpacity {...{onPress}}>
          <Text variant="button" color="background">
            <Text color="lightGray">{`${title} `}</Text>
            <Text color="white">{action}</Text>
          </Text>
        </TouchableOpacity>
      </Box>
    </>
  );
};

export default Footer;
