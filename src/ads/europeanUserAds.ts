import {createContext, useState} from 'react';
import {
  AdsConsent,
  AdsConsentStatus,
  AdsConsentDebugGeography,
} from '@react-native-firebase/admob';

const europeanUserAds = async () => {
  console.log('print --------consentInfo');
  const consentInfo = await AdsConsent.requestInfoUpdate([
    'pub-7757836269117697',
  ]);
  console.log('print --------consentInfo', consentInfo);
  // this is only for testing...
  __DEV__ && (await AdsConsent.setDebugGeography(AdsConsentDebugGeography.EEA));
  if (
    consentInfo.isRequestLocationInEeaOrUnknown &&
    consentInfo.status === AdsConsentStatus.UNKNOWN
  ) {
    const formResult = await AdsConsent.showForm({
      privacyPolicy: 'https://invertase.io/privacy-policy',
      withPersonalizedAds: true,
      withNonPersonalizedAds: true,
    });
    console.log('print --------AADDKKK', formResult.status);
    // The user requested non-personalized or personalized ads
    await AdsConsent.setStatus(formResult.status);
  } else if (
    consentInfo.isRequestLocationInEeaOrUnknown &&
    consentInfo.status !== AdsConsentStatus.UNKNOWN
  ) {
    console.log('print --------AADD', AdsConsentStatus.PERSONALIZED);
    await AdsConsent.setStatus(AdsConsentStatus.PERSONALIZED);
  }
};

const AdConsentContext = createContext(1);

export {europeanUserAds, AdConsentContext};
