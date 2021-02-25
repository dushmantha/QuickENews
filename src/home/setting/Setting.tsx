import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  Dimensions,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CommonActions} from '@react-navigation/native';
import {Text, Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
const {width} = Dimensions.get('window');
import {NavigationBar} from '../components';
import GroupList from './GroupList';

const Setting = ({navigation}: HomeNavigationProps<'Setting'>) => {
  const theme = useTheme();
  const user = auth().currentUser;

  const renderHeaderView = () => {
    return (
      <Box
        flex={1}
        justifyContent="flex-start"
        marginVertical="m"
        borderColor="white"
        borderRadius="l"
        borderWidth={0.5}>
        <Text
          variant="title1"
          color="white"
          textAlign="center"
          paddingBottom="l">
          Account Details
        </Text>
        <Box width={width - 80} alignSelf="center">
          <Box
            flexDirection="row"
            height={50}
            width={width - 80}
            borderRadius="s"
            alignSelf="center"
            alignItems="center"
            paddingHorizontal="s">
            <Icon name="mail" size={25} color={theme.colors.white} />
            <Text variant="body2" paddingStart="s" color="white">
              {user && user.email}
            </Text>
          </Box>
          <Box
            borderRadius="m"
            height={60}
            paddingStart="s"
            justifyContent="center">
            <TouchableOpacity onPress={() => {}}>
              <Text variant="title2" textAlign="left" color="white">
                Subscribe
              </Text>
            </TouchableOpacity>
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
              <Text variant="title2" textAlign="left" color="lightRd">
                Logout
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    );
  };

  // const renderBottonView = () => {
  //   return (
  //     <Box padding="s" width={width - 50} justifyContent="center">
  //       <Box alignItems="center">
  //         <Text variant="title2" marginVertical="m">
  //           Settings
  //         </Text>
  //       </Box>
  //       <Box borderColor="background2" borderRadius="s" borderWidth={0.5}>
  //         <Box margin="s" alignContent="center">
  //           <Box
  //             flexDirection="row"
  //             alignItems="center"
  //             alignContent="center"
  //             justifyContent="space-between"
  //             height={60}>
  //             <Text variant="body2">Push Notification On</Text>
  //             <Switch
  //               trackColor={{
  //                 true: theme.colors.background2,
  //                 false: theme.colors.lightGray,
  //               }}
  //               onValueChange={() => {}}
  //               value={false}></Switch>
  //           </Box>
  //           <Box
  //             flexDirection="row"
  //             alignItems="center"
  //             alignContent="center"
  //             justifyContent="space-between"
  //             height={60}>
  //             <Text variant="body2">Video auto play</Text>
  //             <Switch
  //               trackColor={{
  //                 true: theme.colors.background2,
  //                 false: theme.colors.lightGray,
  //               }}
  //               onValueChange={() => {}}
  //               value={false}></Switch>
  //           </Box>
  //         </Box>
  //         <TouchableOpacity
  //           onPress={() => {}}
  //           style={{marginBottom: Size.paddings.s}}>
  //           <Text variant="title3" color="background2" textAlign="center">
  //             Term and condition
  //           </Text>
  //         </TouchableOpacity>
  //       </Box>
  //     </Box>
  //   );
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Size.paddings.l,
        backgroundColor: theme.colors.background2,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box flex={1}>
        <Box height={70}>
          <NavigationBar title="Setting" />
        </Box>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <Box flex={1} backgroundColor="background">
            <Box
              flex={0.5}
              borderBottomRightRadius="xl"
              backgroundColor="background2"
              alignItems="center"
              justifyContent="flex-end">
              {renderHeaderView()}
            </Box>
            <Box borderTopLeftRadius="xl">
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
                padding="xl">
                <GroupList navigation={navigation} />
              </Box>
            </Box>
            <Text variant="body" color="background2" textAlign="center">
              © 2021 Buckshee
            </Text>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Setting;
