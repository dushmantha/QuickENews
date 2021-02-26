import React from 'react';
import {Dimensions, TouchableOpacity, SectionList, Linking} from 'react-native';
import {openComposer} from 'react-native-email-link';
import Icon from 'react-native-vector-icons/Feather';
import {Text, Box} from '../../components';
import {SettingTypes} from '.././../types';
import {settingSectionList} from './constants';
import {html} from './html';
const {width} = Dimensions.get('window');

const GroupList = ({navigation}: any) => {
  const routes = (navigateIdentifier: string) => {
    switch (navigateIdentifier) {
      case SettingTypes.pushNotification:
        navigation.navigate('PushNotification');
        break;
      case SettingTypes.displaySetting:
        navigation.navigate('DisplaySetting');
        break;
      case SettingTypes.dataUsage:
        navigation.navigate('DataUsage');
        break;
      case SettingTypes.autoplayVideos:
        navigation.navigate('Autoplay');
        break;
      case SettingTypes.reportBug:
        openComposer({
          to: 'support@example.com',
          subject: 'Reporting bug',
          body: 'Hi, I am sending this email...',
        });
        break;
      case SettingTypes.subscriptionQuestion:
        openComposer({
          to: 'support@example.com',
          subject: 'Subscription Question',
          body: 'Hi, I am sending this email...',
        });
        break;
      case SettingTypes.reportNewsError:
        openComposer({
          to: 'support@example.com',
          subject: 'News Error',
          body: 'Hi, I am sending this email...',
        });
        break;
      case SettingTypes.callUs:
        Linking.openURL('tel:8777111223');
        break;
      case SettingTypes.askedQuestion:
        navigation.navigate('Questions');
        break;
      case SettingTypes.termOfService:
        navigation.navigate('About', {
          url: html.termAndCondition,
        });
        break;
      case SettingTypes.privacyPolicy:
        navigation.navigate('About', {
          url: html.privacyPolicy,
        });
        break;
      case SettingTypes.frequentlyAskedQuestion:
        navigation.navigate('About', {
          url: html.faq,
        });
        break;
      default:
        return () => {};
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <Box margin="s">
        <TouchableOpacity
          onPress={() => routes(item.navigateIdentifier)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
          }}>
          <Text variant="body2" paddingStart="s" color="background2">
            {item.name}
          </Text>
          {item.navigate && (
            <Icon name="chevron-right" size={25} color="background2" />
          )}
          {item.number && (
            <Text variant="body3" marginEnd="s">
              {item.number}
            </Text>
          )}
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center">
      <SectionList
        sections={settingSectionList}
        renderSectionHeader={({section}: any) => (
          <Box alignItems="center">
            <Text variant="title2" marginVertical="m" color="background2">
              {section.title}
            </Text>
          </Box>
        )}
        renderItem={renderItem}
        keyExtractor={(index: any) => index.toString()}
      />
    </Box>
  );
};

export default GroupList;
