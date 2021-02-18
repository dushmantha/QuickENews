import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useTheme, Text} from './Theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ButtonProps {
  label?: string;
  onPress: () => void;
}

const Button = ({label, onPress}: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.background2;
  const color = theme.colors.white;
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      {...{onPress}}>
      <Text variant="button" style={{color}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {variant: 'default'};

export default Button;
