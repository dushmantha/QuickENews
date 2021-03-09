import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CommonActions} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, Box, useTheme, Size} from '../../components';
import {HomeNavigationProps} from '../../components/Navigation';
import {NavigationBar} from '../components';
import GroupList from './GroupList';
import {removeUser} from '../../storage';
const {width} = Dimensions.get('window');

const HeaderView = (navigation: any) => {
  const [spinner, setSpinner] = useState(false);
  const user = auth().currentUser;
  const theme = useTheme();
  return (
    <Box flex={1} justifyContent="flex-start" marginVertical="m">
      <Text variant="title1" color="white" textAlign="center" paddingBottom="l">
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
              setSpinner(true);
              auth()
                .signOut()
                .then(() => removeUser())
                .then(
                  () => setSpinner(false),
                  navigation.dispatch(
                    CommonActions.reset({
                      routes: [{name: 'Authentication'}],
                    }),
                  ),
                )
                .catch(() => {
                  setSpinner(false);
                });
            }}>
            <Text variant="title2" textAlign="left" color="lightRd">
              Logout
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={{color: theme.colors.background2}}
      />
    </Box>
  );
};

const Setting = ({navigation}: HomeNavigationProps<'Setting'>) => {
  const theme = useTheme();
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
              <HeaderView {...navigation} />
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
