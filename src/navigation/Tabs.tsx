import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {News, Setting, Bookmark} from '../home';
import {Images} from './assets/icons';
import {useTheme} from '../components/Theme';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useTheme();
  const tabOptions = {
    showLabel: false,
    style: {
      height: '10%',
      backgroundColor: theme.colors.background2,
    },
  };

  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({route}: any) => ({
        tabBarIcon: ({focused}: any) => {
          const tintColor = focused
            ? theme.colors.white
            : theme.colors.lightGray;

          switch (route.name) {
            case 'News':
              return (
                <Image
                  source={Images.dashboard}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'Bookmark':
              return (
                <Image
                  source={Images.bookmark}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );

            case 'Setting':
              return (
                <Image
                  source={Images.setting}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25,
                  }}
                />
              );
          }
        },
      })}>
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default Tabs;
