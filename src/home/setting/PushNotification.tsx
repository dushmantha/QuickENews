import React, {useState, useEffect} from 'react';
import {Dimensions, Switch, SectionList, BackHandler} from 'react-native';
import {Text, Box, useTheme} from '../../components';
const {width} = Dimensions.get('window');
import {getUserFromStorage} from '../../storage';

const PushNotification = () => {
  const theme = useTheme();

  const [breakingNews, setBreakingNews] = useState(async () => {
    const item = await getUserFromStorage();
    setBreakingNews(item?.breaking_news as any); //here the state set self
  });
  const [morningNews, setMorningNews] = useState(async () => {
    const item = await getUserFromStorage();
    setMorningNews(item?.morning_briefing as any); //here the state set self
  });
  const [eveningNews, setEveningNews] = useState(async () => {
    const item = await getUserFromStorage();
    setEveningNews(item?.evening_briefing as any); //here the state set self
  });
  const [politics, setPolitics] = useState(async () => {
    const item = await getUserFromStorage();
    setPolitics(item?.politics as any); //here the state set self
  });
  const [businessAndTech, setBusinessAndTech] = useState(async () => {
    const item = await getUserFromStorage();
    setBusinessAndTech(item?.business_and_technology as any); //here the state set self
  });
  const [sport, setSport] = useState(async () => {
    const item = await getUserFromStorage();
    setSport(item?.sport as any); //here the state set self
  });
  const [politicsUpdate, setPoliticsUpdate] = useState(async () => {
    const item = await getUserFromStorage();
    setPoliticsUpdate(item?.live_politics_update as any); //here the state set self
  });
  const [health, setHealth] = useState(async () => {
    const item = await getUserFromStorage();
    setHealth(item?.health as any); //here the state set self
  });

  const toggleSwitch = (on: boolean, slag: string) => {
    slag === 'breaking_news' && setBreakingNews(on as any);
    slag === 'morning_briefing' && setMorningNews(on as any);
    slag === 'evening_briefing' && setEveningNews(on as any);
    slag === 'politics' && setPolitics(on as any);
    slag === 'business_and_technology' && setBusinessAndTech(on as any);
    slag === 'sport' && setSport(on as any);
    slag === 'live_politics_update' && setPoliticsUpdate(on as any);
    slag === 'health' && setHealth(on as any);
  };

  const pushNotificationSection = [
    {
      header: 'GET CAUGHT UP',
      data: [
        {
          title: 'Breaking New',
          subTitle: 'Urgent and important stories',
          slag: 'breaking_news',
          on: breakingNews,
        },
        {
          title: 'Morning Briefing',
          subTitle: 'What you need to know to start your day',
          slag: 'morning_briefing',
          on: morningNews,
        },
        {
          title: 'Evening Briefing',
          subTitle: 'A rundown of the day top stories',
          slag: 'evening_briefing',
          on: eveningNews,
        },
      ],
    },
    {
      header: 'GENERAL',
      data: [
        {
          title: 'Politics',
          subTitle: 'Fearless coverage',
          slag: 'politics',
          on: politics,
        },
        {
          title: 'Business & Technology',
          subTitle: 'Market-moving nes and feature',
          slag: 'business_and_technology',
          on: businessAndTech,
        },
        {
          title: 'Sport',
          subTitle: 'Scores, live updates and great reads',
          slag: 'sport',
          on: sport,
        },
      ],
    },
    {
      header: 'LIVE COVERAGE',
      data: [
        {
          title: 'Live Politics Update',
          subTitle: 'Never miss a thing',
          slag: 'live_politics_update',
          on: politicsUpdate,
        },
        {
          title: 'Covid-19',
          subTitle: 'Health',
          slag: 'health',
          on: health,
        },
      ],
    },
  ];

  const handleBackButtonClick = () => {
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const renderItem = ({item}: any) => {
    return (
      <Box
        margin="m"
        flexDirection="row"
        justifyContent="space-between"
        flex={1}
        alignContent="space-between">
        <Box flex={0.9}>
          <Text
            variant="body2"
            paddingStart="s"
            color="background2"
            numberOfLines={2}>
            {item.title}
          </Text>
          <Text
            variant="body"
            paddingStart="s"
            color="background2"
            numberOfLines={5}>
            {item.subTitle}
          </Text>
        </Box>
        <Box flex={0.1}>
          <Switch
            style={{alignSelf: 'center'}}
            trackColor={{
              true: theme.colors.background2,
              false: theme.colors.lightGray,
            }}
            onValueChange={(on) => toggleSwitch(on, item.slag)}
            value={item.on}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="m" width={width} justifyContent="center">
      <Box borderColor="background2" borderRadius="m" borderWidth={0.5}>
        <SectionList
          sections={pushNotificationSection}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({section}: any) => (
            <Box alignItems="center">
              <Text variant="title2" marginVertical="m">
                {section.header}
              </Text>
            </Box>
          )}
          renderItem={renderItem}
          keyExtractor={(index: any) => index.toString()}
        />
      </Box>
    </Box>
  );
};

export default PushNotification;
