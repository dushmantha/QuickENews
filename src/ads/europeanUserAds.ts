import {
  AdsConsent,
  AdsConsentStatus,
  AdsConsentDebugGeography,
  TestIds,
} from '@react-native-firebase/admob';
import {Platform} from 'react-native';
const adRewardedUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
  ? 'ca-app-pub-7757836269117697/1169954122'
  : 'ca-app-pub-7757836269117697/3517464603';

const europeanUserAds = async () => {
  const consentInfo = await AdsConsent.requestInfoUpdate([adRewardedUnitId]);
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
    // The user requested non-personalized or personalized ads
    await AdsConsent.setStatus(formResult.status);
  } else if (
    consentInfo.isRequestLocationInEeaOrUnknown &&
    consentInfo.status !== AdsConsentStatus.UNKNOWN
  ) {
    await AdsConsent.setStatus(AdsConsentStatus.PERSONALIZED);
  }
};

export {europeanUserAds};
