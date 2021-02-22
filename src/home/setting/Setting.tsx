import React from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions, Switch, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CommonActions} from '@react-navigation/native';
import {Text, Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
const {width} = Dimensions.get('window');

const Setting = ({navigation}: HomeNavigationProps<'Setting'>) => {
  const theme = useTheme();
  const renderHeaderView = () => {
    return (
      <Box flex={1} justifyContent="center">
        <Box>
          <Text
            variant="title1"
            color="white"
            textAlign="center"
            paddingBottom="l">
            Account Details
          </Text>
        </Box>
        <Box width={width - 80} alignSelf="center">
          <Box marginBottom="m">
            <Box
              flexDirection="row"
              height={50}
              width={width - 80}
              borderRadius="s"
              borderColor="white"
              borderWidth={0.5}
              alignSelf="center"
              alignItems="center"
              paddingHorizontal="s">
              <Icon name="mail" size={25} color={theme.colors.white} />
              <Text variant="body2" paddingStart="s" color="white">
                tdmihiran@gmail.com
              </Text>
            </Box>
          </Box>
          <Box
            borderRadius="m"
            height={60}
            alignItems="center"
            justifyContent="center">
            <TouchableOpacity
              onPress={() => {
                auth()
                  .signOut()
                  .then(() =>
                    navigation.dispatch(
                      CommonActions.reset({
                        routes: [{name: 'Welcome'}],
                      }),
                    ),
                  );
              }}>
              <Text variant="title2" textAlign="left" color="white">
                Logout
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderBottonView = () => {
    return (
      <Box padding="s" width={width - 50} justifyContent="center">
        <Box alignItems="center">
          <Text variant="title2" marginVertical="m">
            Settings
          </Text>
        </Box>
        <Box borderColor="background2" borderRadius="s" borderWidth={0.5}>
          <Box margin="s" alignContent="center">
            <Box
              flexDirection="row"
              alignItems="center"
              alignContent="center"
              justifyContent="space-between"
              height={60}>
              <Text variant="body2">Push Notification On</Text>
              <Switch
                trackColor={{
                  true: theme.colors.background2,
                  false: theme.colors.lightGray,
                }}
                onValueChange={() => {}}
                value={false}></Switch>
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              alignContent="center"
              justifyContent="space-between"
              height={60}>
              <Text variant="body2">Video auto play</Text>
              <Switch
                trackColor={{
                  true: theme.colors.background2,
                  false: theme.colors.lightGray,
                }}
                onValueChange={() => {}}
                value={false}></Switch>
            </Box>
          </Box>
          <TouchableOpacity
            onPress={() => {}}
            style={{marginBottom: Size.paddings.s}}>
            <Text variant="title3" color="background2" textAlign="center">
              Term and condition
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={1} backgroundColor="background">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="background2"
        alignItems="center"
        justifyContent="flex-end">
        {renderHeaderView()}
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
          {renderBottonView()}
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
