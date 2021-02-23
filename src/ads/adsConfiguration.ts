import {useEffect, useState} from 'react';
import admob, {
  MaxAdContentRating,
  AdsConsent,
} from '@react-native-firebase/admob';

import {europeanUserAds} from '.';
const adsRequestConfiguration = () => {
  admob()
    .setRequestConfiguration({
      // Update all future requests suitable for general guidance
      maxAdContentRating: MaxAdContentRating.G,
      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,
      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      console.log('Request config successfully set!');
    });
};

const useAddConfig = () => {
  const [state, setState] = useState(1);
  useEffect(() => {
    const getStatus = async () => {
      try {
        await europeanUserAds();
        setState(await AdsConsent.getStatus());
      } catch (err) {
        console.error(err);
      }
    };
    try {
      getStatus();
      adsRequestConfiguration();
    } catch (error) {
      console.error(error);
    }
  }, [state]);
  return state;
};

export {adsRequestConfiguration, useAddConfig};
