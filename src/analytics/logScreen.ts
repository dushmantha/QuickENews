import analytics from '@react-native-firebase/analytics';

const logScreen = async (routeNameRef: any, navigationRef: any) => {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = navigationRef.current.getCurrentRoute().name;

  if (previousRouteName !== currentRouteName) {
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    });
  }
};

// For example:
// import * as Analytics from 'expo-firebase-analytics';
// import { useRef } from 'react';
// import { NavigationContainer } from '@react-navigation/native';

// export default () => {
//   const navigationRef = useRef();
//   const routeNameRef = useRef();

//   return (
//     <NavigationContainer
//       ref={navigationRef}
//       onReady={() =>
//         (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
//       }
//       onStateChange={async () => {
//         const previousRouteName = routeNameRef.current;
//         const currentRouteName = navigationRef.current.getCurrentRoute().name;

//         if (previousRouteName !== currentRouteName) {
//           // The line below uses the expo-firebase-analytics tracker
//           // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
//           // Change this line to use another Mobile analytics SDK
//           await analytics().logScreenView({
//             screen_name: currentRouteName,
//             screen_class: currentRouteName
//           });
//         }

//         // Save the current route name for later comparison
//         routeNameRef.current = currentRouteName;
//       }}
//     >
//       {/* ... */}
//     </NavigationContainer>
//   );
// };

export {logScreen};
