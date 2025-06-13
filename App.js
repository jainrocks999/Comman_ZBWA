
// import React, { Fragment, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   LogBox,
//   Button,
//   Platform,
//   SafeAreaView,
//   FlatList,
//   StatusBar,
//   Alert,
//   Image
// } from 'react-native';
// import 'react-native-gesture-handler';
// import { Provider } from 'react-redux';
// import Store from './src/Redux/Store';
// import RootApp from './src/navigation';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import PushNotification from "react-native-push-notification";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Storage from "./src/components/LocalStorage";
// import messaging from "@react-native-firebase/messaging";
// import crashlytics from '@react-native-firebase/crashlytics';
// // import NetInfo from "@react-native-community/netinfo";
// import { useNetInfo } from "@react-native-community/netinfo";
// import * as RootNavigation from "./src/navigation/RootNavigation";
// import LinearGradient from 'react-native-linear-gradient';


// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

// PushNotification.createChannel(
//   {
//     channelId: "default-channel-id",
//     channelName: "My channel",
//     vibrate: true,
//   },
//   (created) => console.log(`createChannel returned '${created}'`)
// );
// const App = () => {

//   const { type, isConnected } = useNetInfo();

//   const manageLogin = async () => {

//     const user_id = await AsyncStorage.getItem('user_token')
//     if (user_id == null) {
//       console.log('this is working null');
//       RootNavigation.push('FirstPage')
//       // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
//     } else if (user_id) {
//       console.log('this is working');
//       RootNavigation.push('ZBWGroup')

//       // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
//     }
//   }
//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log("TOKEN:", token);
//       AsyncStorage.setItem(Storage.fcm_token, token.token)
//     },
//     onNotification: function (notification) {
//       PushNotification.localNotification({
//         title: notification.message,
//         message: notification.title,
//       });
//       console.log('this is notifi', notification);
//       if (notification.userInteraction === true && notification.foreground == false && notification.title == 'New Message on ZBWA Group') {
//         manageLogin()
//       }
//       else {
//         if (notification.userInteraction == true && notification.foreground == true && notification.title == 'New Message on ZBWA Group') {
//           manageLogin()
//         }
//       }
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },
//     onAction: function (notification) {
//       console.log("ACTION:", notification.action);
//       console.log("NOTIFICATION:", notification);
//     },
//     onRegistrationError: function (err) {
//       console.error(err.message, err);
//     },
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: true,
//   });
//   const getFCMToken = async () => {
//     try {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (!enabled) {
//         console.log('Authorization status not enabled');
//         return;
//       }

//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log('FCM Token:', fcmToken);
//         await AsyncStorage.setItem(Storage.fcm_token, fcmToken);
//       } else {
//         console.log('Failed to get FCM token');
//       }
//     } catch (err) {
//       console.log('thisis erroryo', err);
//     }
//   };


//   // const getFCMToken = async () => {
//   //   try {
//   //     const apnsToken = await messaging().getAPNSToken();
//   //     if (apnsToken) {
//   //       await messaging().setAPNSToken(apnsToken);
//   //       var token = await messaging().getToken();
//   //       AsyncStorage.setItem(Storage.fcm_token,token)
//   //     } else {
//   //       await messaging().setAPNSToken('APN_TOKEN');
//   //       var token = await messaging().getToken();
//   //       AsyncStorage.setItem(Storage.fcm_token,token)
//   //     }

//   //   } catch (err) {
//   //     console.log('thisis erroryo', err);
//   //   }
//   // };
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       PushNotification.localNotification({
//         message: remoteMessage.notification.body,
//         title: remoteMessage.notification.title,
//       });
//       if (remoteMessage.notification.userInteraction === true && remoteMessage.notification.foreground == false && remoteMessage.notification.title == 'New Message on ZBWA Group') {
//         manageLogin()
//       }
//       else {
//         if (remoteMessage.notification.userInteraction == true && remoteMessage.notification.foreground == true && remoteMessage.notification.title == 'New Message on ZBWA Group') {
//           manageLogin()
//         }
//       }

//       console.log('this is remote notification', remoteMessage);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     Platform.OS == 'ios' ? getFCMToken() : null
//   }, []);
//   useEffect(() => {
//     handleCrash()
//   }, [])

//   const handleCrash = async () => {
//     crashlytics().log('Analytics page just mounted')
//     getCrashlyticsDetail()
//     return () => {
//       crashlytics().log('Analytics page just unmounted')
//     }
//   }

//   const getCrashlyticsDetail = async () => {
//     const user_id = await AsyncStorage.getItem(Storage.user_id)
//     const name = await AsyncStorage.getItem(Storage.username)
//     try {
//       crashlytics().setUserId(user_id)
//       crashlytics().setAttribute('username', name)
//     } catch (err) {
//       crashlytics().recordError(err)
//     }
//   }

//   // <LinearGradient
//   //     colors={['#DDAC17', '#FFFA8A', '#ECC440']}
//   //     start={{x: 0, y: 0}}
//   //     end={{x: 1, y: 0}}
//   //     style={{
//   //       flex: 1,
//   //       paddingTop:
//   //         Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   //     }}>
//   //     <StatusBar
//   //       translucent
//   //       backgroundColor="transparent"
//   //       barStyle="light-content"
//   //     />
//   //     <Provider store={Store}>
//   //       <RootApp />
//   //     </Provider>
//   //   </LinearGradient>

//   return (
//     <Fragment>
//       {isConnected == null ? <View /> : <View style={{ flex: 1 }}>
//         {isConnected ?
//           <SafeAreaView
//             style={{
//               flex: 1,
//               backgroundColor: Platform.OS == 'ios' ? '#000' : '#F9F4F1',
//             }}>
//             <Provider store={Store}>
//               <RootApp />
//             </Provider>
//             <StatusBar
//               backgroundColor={"#000"}
//               barStyle={"light-content"}
//             />
//           </SafeAreaView>
//           :
//           <SafeAreaView
//             style={{
//               flex: 1,
//               backgroundColor: Platform.OS == 'ios' ? '#000' : '#fff',
//             }}>
//             <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//               <Image source={require('./src/assets/Icon/network.png')} />
//               <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>Please Check Your Internet Connection!</Text>
//             </View>
//           </SafeAreaView>}
//       </View>}
//     </Fragment>
//   );
 
// };

// export default App;


import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  PermissionsAndroid,
} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNetInfo } from '@react-native-community/netinfo';
import * as RootNavigation from './src/navigation/RootNavigation';
import Storage from './src/components/LocalStorage';

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'My channel',
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

const App = () => {
  const { isConnected } = useNetInfo();

  const manageLogin = async () => {
    const user_id = await AsyncStorage.getItem('user_token');
    if (user_id == null) {
      RootNavigation.push('FirstPage');
    } else {
      RootNavigation.push('ZBWGroup');
    }
  };

  const getFCMToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('Authorization status not enabled');
        return;
      }

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(Storage.fcm_token, fcmToken);
        console.log('FCM Token:', fcmToken);
      }
    } catch (err) {
      console.log('FCM Token Error:', err);
    }
  };

  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
      }
    }
  };

  const handleCrashlyticsSetup = async () => {
    try {
      crashlytics().log('App mounted');
      const user_id = await AsyncStorage.getItem(Storage.user_id);
      const name = await AsyncStorage.getItem(Storage.username);

      if (user_id) {
        await crashlytics().setUserId(user_id);
      }
      if (name) {
        await crashlytics().setAttribute('username', name);
      }
    } catch (err) {
      crashlytics().recordError(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getFCMToken();
    } else {
      requestAndroidNotificationPermission();
      getFCMToken();
    }
    handleCrashlyticsSetup();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotification.localNotification({
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body,
      });

      const title = remoteMessage?.notification?.title;
      if (
        remoteMessage?.notification?.userInteraction &&
        title === 'New Message on ZBWA Group'
      ) {
        manageLogin();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        AsyncStorage.setItem(Storage.fcm_token, token.token);
      },
      onNotification: function (notification) {
        PushNotification.localNotification({
          title: notification.message,
          message: notification.title,
        });

        if (
          notification.userInteraction &&
          notification.title === 'New Message on ZBWA Group'
        ) {
          manageLogin();
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return (
    <Fragment>
      {isConnected == null ? (
        <View />
      ) : (
        <View style={{ flex: 1 }}>
          {isConnected ? (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: Platform.OS === 'ios' ? '#000' : '#F9F4F1',
              }}>
              <Provider store={Store}>
                <RootApp />
              </Provider>
              <StatusBar
                backgroundColor={'#000'}
                barStyle={'light-content'}
              />
            </SafeAreaView>
          ) : (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: Platform.OS === 'ios' ? '#000' : '#fff',
              }}>
              <View
                style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Image
                  source={require('./src/assets/Icon/network.png')}
                  style={{ width: 100, height: 100, marginBottom: 20 }}
                />
                <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>
                  Please Check Your Internet Connection!
                </Text>
              </View>
            </SafeAreaView>
          )}
        </View>
      )}
    </Fragment>
  );
};

export default App;
