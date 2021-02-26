import {getBuildNumber, getVersion} from 'react-native-device-info';

const settingSectionList = [
  {
    title: 'General',
    data: [
      {
        name: 'Push Notification Settings',
        navigate: true,
        navigateIdentifier: 'push_notification',
      },
      {
        name: 'Display Settings',
        navigate: true,
        navigateIdentifier: 'display_setting',
      },
      {
        name: 'Data Usage',
        navigate: true,
        navigateIdentifier: 'data_usage',
      },
      {
        name: 'Autoplay Videos',
        navigate: true,
        navigateIdentifier: 'auto_paly_video',
      },
    ],
  },
  {
    title: 'Support',
    data: [
      {
        name: 'Report a Bug',
        navigate: false,
        navigateIdentifier: 'report_bug',
      },
      {
        name: 'Subscription Question',
        navigate: false,
        navigateIdentifier: 'subscription_question',
      },
      {
        name: 'Report a News Error',
        navigate: false,
        navigateIdentifier: 'report_news_error',
      },
      {
        name: 'Call Us',
        navigate: false,
        navigateIdentifier: 'call_us',
      },
      {
        name: 'Asked Question',
        navigate: false,
        navigateIdentifier: 'asked_question',
      },
    ],
  },
  {
    title: 'About',
    data: [
      {
        name: 'Term of Service',
        navigate: true,
        url: '',
        navigateIdentifier: 'term_of_service',
      },
      {
        name: 'Privacy Policy',
        navigate: true,
        url: '',
        navigateIdentifier: 'privacy_policy',
      },
      {
        name: 'Version',
        navigate: false,
        number: getVersion(),
        navigateIdentifier: 'version',
      },
      {
        name: 'Build',
        navigate: false,
        number: getBuildNumber(),
        navigateIdentifier: 'build',
      },
      {
        name: 'Frequently Asked Question',
        navigate: true,
        navigateIdentifier: 'frequently_asked_question',
      },
    ],
  },
];

const autoPlayOptions = [
  {
    title: 'Mobile Data and Wifi Networks',
    index: 0,
  },
  {
    title: 'Wifi Only',
    index: 1,
  },
  {
    title: 'Never Autoplay Video',
    index: 2,
  },
];

const dataUsageOption = [
  {
    title: 'Automatic Refresh',
    id: 1,
    subTitle:
      'Turning off automatic refresh will prevent content from updating automatically. Pull to refresh on any section front to get new content',
  },
  {
    title: 'Download Images',
    id: 2,
    subTitle:
      'Turning off images will prevent all images form displaying on section fronts to reduce data usage.',
  },
];

const pushNotificationSection = [
  {
    header: 'GET CAUGHT UP',
    data: [
      {
        title: 'Breaking New',
        subTitle: 'Urgent and important stories',
        id: 1,
        on: true,
      },
      {
        title: 'Morning Briefing',
        subTitle: 'What you need to know to start your day',
        id: 1,
        on: false,
      },
      {
        title: 'Evening Briefing',
        subTitle: 'A rundown of the day top stories',
        id: 1,
        on: false,
      },
    ],
  },
  {
    header: 'GENERAL',
    data: [
      {
        title: 'Politics',
        subTitle: 'Fearless coverage',
        id: 1,
        on: true,
      },
      {
        title: 'Business & Technology',
        subTitle: 'Market-moving nes and feature',
        id: 1,
        on: false,
      },
      {
        title: 'Sport',
        subTitle: 'Scores, live updates and great reads',
        id: 1,
        on: false,
      },
    ],
  },
  {
    header: 'LIVE COVERAGE',
    data: [
      {
        title: 'Live Politics Update',
        subTitle: 'Never miss a thing',
        id: 1,
        on: true,
      },
      {
        title: 'Covid-19',
        subTitle: 'Health',
        id: 1,
        on: false,
      },
    ],
  },
];

export {
  settingSectionList,
  autoPlayOptions,
  dataUsageOption,
  pushNotificationSection,
};
