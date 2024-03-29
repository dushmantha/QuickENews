import React, {forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Box, useTheme} from '..';
import RoundedIcon from '../RoundedIcon';
import {Text} from '../Theme';

interface TextInputProps extends RNTextInputProps {
  icon?: string;
  touched?: boolean;
  error?: string;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({icon, touched, error, ...props}, ref) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2.5;
    const validationColor = error ? 'danger' : 'background2';
    const color = !touched ? 'text' : validationColor;
    return (
      <Box
        flexDirection="row"
        height={48}
        alignItems="center"
        borderRadius="s"
        borderWidth={0.5}
        borderColor={color}
        paddingEnd="s">
        <Box padding="s">
          <Text {...{color}}>
            <Icon name={icon} size={16} />
          </Text>
        </Box>
        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={theme.colors[color]}
            {...{ref}}
            {...props}
          />
        </Box>
        {touched && (
          <RoundedIcon
            name={!error ? 'check' : 'x'}
            size={SIZE}
            backgroundColor={!error ? 'background2' : 'danger'}
            color="background"
          />
        )}
      </Box>
    );
  },
);

export default TextInput;
