import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';

import {Box, Text} from '../Theme';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = ({label, onChange, checked}: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChange()}
      style={{justifyContent: 'center'}}>
      <Box flexDirection="row" alignItems="center">
        <Box
          marginRight="m"
          height={20}
          width={20}
          borderRadius="s"
          justifyContent="center"
          alignItems="center"
          borderWidth={1}
          borderColor="background2"
          backgroundColor={checked ? 'background2' : 'background'}>
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Checkbox;
