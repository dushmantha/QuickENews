import React, {useEffect, useState, useContext} from 'react';
import {
  BannerAd,
  FirebaseAdMobTypes,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
  AdsConsentStatus,
} from '@react-native-firebase/admob';
import {Platform, Button} from 'react-native';
import {AdConsentContext} from './europeanUserAds';
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
  // const status = useContext(AdConsentContext);
  return (
    <BannerAd
      unitId={adBannerUnitId}
      size={size.bannerAdSize}
      // size={bannerAdSize.FULL_BANNER}
      requestOptions={{
        // requestNonPersonalizedAdsOnly:
        //   status === AdsConsentStatus.NON_PERSONALIZED,
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        /**
         * When an ad has failed to load. Callback contains an Error.
         */
      }}
      onAdFailedToLoad={() => {
        /**
         * The ad is now visible to the user.
         */
      }}
      onAdOpened={() => {}}
      onAdClosed={() => {}}
      onAdLeftApplication={() => {}}
    />
  );
};

const Rewarded = () => {
  const [loaded, setLoaded] = useState(false);
  // const status = useContext(AdConsentContext);
  const rewarded = RewardedAd.createForAdRequest(adRewardedUnitId, {
    // requestNonPersonalizedAdsOnly: status === AdsConsentStatus.NON_PERSONALIZED,
    requestNonPersonalizedAdsOnly: true,
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
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
  );
};

export {Banner, Rewarded};
