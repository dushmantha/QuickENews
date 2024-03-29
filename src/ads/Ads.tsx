import React, {useEffect, useState, useContext} from 'react';
import {
  BannerAd,
  FirebaseAdMobTypes,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdsConsentStatus,
} from '@react-native-firebase/admob';
import {Platform} from 'react-native';
import {Button, Box} from '../components';
import {AdConsentContext, AdEnabledContext} from './';
const adBannerUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
  ? 'ca-app-pub-7757836269117697/1169954122'
  : 'ca-app-pub-7757836269117697/3517464603';

const adRewardedUnitId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'android'
  ? 'ca-app-pub-7757836269117697/1169954122'
  : 'ca-app-pub-7757836269117697/3517464603';

const Banner = (size: {bannerAdSize: FirebaseAdMobTypes.BannerAdSize}) => {
  const status = useContext(AdConsentContext);
  const enabled = useContext(AdEnabledContext);
  console.log('When an ad has finished loading', adRewardedUnitId);
  return (
    <Box>
      {enabled && (
        <BannerAd
          unitId={adBannerUnitId}
          size={size.bannerAdSize}
          // size={bannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly:
              status === AdsConsentStatus.NON_PERSONALIZED,
            // requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('When an ad has finished loading');
            /**
             * When an ad has finished loading..
             */
          }}
          onAdFailedToLoad={(err) => {
            console.log(
              'When an ad has failed to load. Callback contains an Error',
              err,
            );
            /**
             * The ad is now visible to the user.
             */
          }}
          onAdOpened={() => {}}
          onAdClosed={() => {}}
          onAdLeftApplication={() => {}}
        />
      )}
    </Box>
  );
};

const Rewarded = () => {
  const [loaded, setLoaded] = useState(false);
  const status = useContext(AdConsentContext);
  const rewarded = RewardedAd.createForAdRequest(adRewardedUnitId, {
    requestNonPersonalizedAdsOnly: status === AdsConsentStatus.NON_PERSONALIZED,
    // requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  useEffect(() => {
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  });

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      label="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
  );
};

export {Banner, Rewarded};
