// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   BackHandler,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import ForwardArrow from '../../../assets/Icon/ForwardArrow.svg';
// import Arrow from '../../../assets/Icon/Arrow.svg';
// import Eye from '../../../assets/Icon/eye.svg';
// import Eye1 from '../../../assets/Icon/eye1.svg';
// import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import styles from './styles';
// import axios from 'axios';
// import Toast from 'react-native-simple-toast';
// import Loader from '../../../components/Loader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Storage from '../../../components/LocalStorage';
// import Constants from '../../../Redux/Constants';

// const Login = () => {
//    const route = useRoute();
//   const navigation = useNavigation();
//   // const [mobile, setMobile] = useState('');
//    const [mobile, setMobile] = useState(route.params?.mobile || '');
//   const [password, setPassword] = useState('');
//   const [loader, setLoader] = useState(false);
//   const [visible, setVisible] = useState(true);

//  useFocusEffect(
//   React.useCallback(() => {
//     const onBackPress = () => {
//       navigation.navigate('LoginFirst');
//       return true; 
//     };

//     BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     return () =>
//       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//   }, [])
// );




//   const userLogin = async () => {
//     const fcm_token = await AsyncStorage.getItem(Storage.fcm_token);
//     console.log('this is fcm token999999999999999988888888888888888888', fcm_token);
//     console.log('mobile number', mobile)
//     // return

//     if (mobile == '') {
//       Toast.show('Please enter your phone number');
//     } else if (mobile.length < 10) {
//       Toast.show('Please enter 10 digit phone number');
//     } else if (password == '') {
//       Toast.show('Please enter your password');
//     } else {
//       setLoader(true);
//       axios({
//         method: 'post',
//         url: `${Constants.MainUrl}user/login`,
//         data: {
//           mobile: mobile,
//           action: 'password',
//           password: password,
//         },
//       })
//         .then(function (response) {
//           if (response.data.code == '200') {
//             let data = JSON.stringify({
//               fcm_token: fcm_token == null ? '' : fcm_token,
//             });

//             let config = {
//               method: 'post',
//               maxBodyLength: Infinity,
//               url: `${Constants.MainUrl}user/update/fcm/token`,
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: response.data.data.token,
//               },
//               data: data,
//             };

//             axios
//               .request(config)
//               .then(response1 => {
//                 if (response1.data.code == 200) {
//                   console.log('this is user detail', response.data);
//                   setLoader(false);
//                   Toast.show(response.data.message);
//                   AsyncStorage.setItem(Storage.user_id, response.data.data._id);
//                   AsyncStorage.setItem(
//                     Storage.username,
//                     `${response.data.data.firstName} ${response.data.data.lastName}`,
//                   );
//                   AsyncStorage.setItem(
//                     Storage.user_token,
//                     response.data.data.token,
//                   );
//                   AsyncStorage.setItem(
//                     Storage.isPremium,
//                     JSON.stringify(response.data.data.isPrimary),
//                   );
//                   navigation.replace('Home');
//                 } else {
//                   setLoader(false);
//                 }
//               })
//               .catch(error => {
//                 setLoader(false);
//                 console.log(error);
//               });
//           } else {
//             setLoader(false);
//             Toast.show(response.data.message);
//           }
//         })
//         .catch(function (error) {
//           setLoader(false);
//           console.log('error', error);
//           Toast.show(error.response.data.message);
//         });
//     }
//   };

// //  useFocusEffect(
// //   React.useCallback(() => {
// //     const onBackPress = () => {
// //       navigation.navigate('LoginFirst'); 
// //       return true; 
// //     };

// //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

// //     return () =>
// //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
// //   }, [])
// // );

//   return (
//     <LinearGradient
//       colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']}
//       style={{flex: 1}}>
//       {loader ? <Loader /> : null}
//       <ScrollView contentContainerStyle={{flexGrow: 1}}>
//         <KeyboardAwareScrollView
//           extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
//           enableOnAndroid={true}
//           keyboardShouldPersistTaps="handled"
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           contentContainerStyle={{flexGrow: 1}}>
//           <View style={{}}>
//             <View style={styles.main}>
//               <Image
//                 style={[styles.logo, {resizeMode: 'contain'}]}
//                 source={require('../../../assets/Logo/Zbwa1.png')}
//               />
//             </View>
//             <View style={[styles.container, {marginTop: 30, height: 350}]}>
//               <View style={styles.yellow}>
//                 <View style={styles.view}>
//                   <View style={{flexDirection: 'row'}}>
//                     <Text style={styles.signup}>Sign up </Text>
//                     <Text style={styles.free}>for free</Text>
//                   </View>
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     onPress={() => navigation.navigate('LoginFirst')}
//                     style={styles.arrowContainer}>
//                     <ForwardArrow />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={{alignItems: 'center'}}>
//                   <View style={styles.black}>
//                     <View style={{paddingHorizontal: 40, marginTop: 10}}>
//                       <Text style={styles.already}>
//                         Already Registered user?
//                       </Text>
//                       <Text style={styles.login}>Login</Text>
//                       <View style={styles.country}>
//                         <Text style={styles.ninety}>+91</Text>
//                         <TextInput
//                           contextMenuHidden
//                           style={styles.input}
//                           placeholder="Phone Number"
//                           placeholderTextColor={'#FFFFFF'}
//                           value={mobile}
//                           onChangeText={val => {
//                             const regex = /^\d{0,10}$/;
//                             if (regex.test(val)) {
//                               setMobile(val);
//                             }
//                           }}
//                           keyboardType="number-pad"
//                           maxLength={10}
//                         />
//                       </View>
//                       <View style={styles.inputContainer}>
//                         <TextInput
//                           style={styles.pass}
//                           placeholder="Password"
//                           placeholderTextColor={'#FFFFFF'}
//                           keyboardType="default"
//                           value={password}
//                           onChangeText={val => setPassword(val)}
//                           secureTextEntry={visible}
//                         />
//                         {visible ? (
//                           <TouchableOpacity
//                             style={{padding: 6}}
//                             onPress={() => setVisible(!visible)}>
//                             <Eye />
//                           </TouchableOpacity>
//                         ) : (
//                           <TouchableOpacity
//                             style={{padding: 6}}
//                             onPress={() => setVisible(!visible)}>
//                             <Eye1 />
//                           </TouchableOpacity>
//                         )}
//                       </View>
//                       <View style={{marginTop: 10}}>
//                         <Text
//                           onPress={() => navigation.navigate('Forgot')}
//                           style={styles.forgot}>
//                           Forgot Password?
//                         </Text>
//                         <Text
//                           onPress={() => navigation.navigate('Pin', { mobile: mobile })}
//                           style={styles.mpin}>
//                           Login with mPIN
//                         </Text>
//                       </View>
//                     </View>
//                     <View style={{marginTop: 30, alignItems: 'flex-end'}}>
//                       <TouchableOpacity
//                         onPress={() =>
//                           // navigation.replace('Home')
//                           userLogin()
//                         }
//                         style={styles.button}>
//                         <Text style={styles.text}>Login</Text>
//                         <Arrow />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={{height: 140}} />
//         </KeyboardAwareScrollView>
//       </ScrollView>
//     </LinearGradient>
//   );
// };
// export default Login;



import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Platform, Alert, BackHandler } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForwardArrow from "../../../assets/Icon/ForwardArrow.svg";
import Arrow from "../../../assets/Icon/Arrow.svg";
import Eye from "../../../assets/Icon/eye5.svg"
import Eye1 from "../../../assets/Icon/eyes.svg"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Constants from "../../../Redux/Constants";
import messaging from "@react-native-firebase/messaging";

const Login = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const [mobile, setMobile] = useState(route.params?.mobile || '')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const [visible, setVisible] = useState(true)
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.navigate('LoginFirst');
  //       return true;
  //     };


  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [])
  // );

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Navigate to a different screen manually
  //     navigation.navigate('LoginFirst');
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     // Prevent default behavior of leaving the screen
  //     e.preventDefault();

  //     // Navigate to Login instead
  //     // navigation.navigate('LoginFirst');
  //     navigation.goBack()
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      // Remove this listener so the next goBack won't trigger it again
      unsubscribe();

      // Now go back safely
      navigation.dispatch(e.data.action);
    });

    return unsubscribe;
  }, [navigation]);

  const userLogin = async () => {
    const fcm_token = await AsyncStorage.getItem(Storage.fcm_token)

    var token = await messaging().getToken();
    if (mobile == '') {
      Toast.show('Please enter your phone number')
    }
    else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number')
    }
    else if (password == '') {
      Toast.show('Please enter your password')
    }
    else {
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/login`,
        data: {
          "mobile": mobile,
          "action": "password",
          "password": password
        }
      })
        .then(function (response) {
          if (response.data.code == '200') {
            let data = JSON.stringify({
              "fcm_token": token
            });

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: `${Constants.MainUrl}user/update/fcm/token`,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': response.data.data.token,
              },
              data: data
            };

            axios.request(config)
              .then((response1) => {
                if (response1.data.code == 200) {
                  console.log('this is user detail', response.data);
                  setLoader(false)
                  Toast.show(response.data.message)
                  AsyncStorage.setItem(Storage.user_id, response.data.data._id)
                  AsyncStorage.setItem(Storage.username, `${response.data.data.firstName} ${response.data.data.lastName}`)
                  AsyncStorage.setItem(Storage.user_token, response.data.data.token)
                  AsyncStorage.setItem(Storage.isPremium, JSON.stringify(response.data.data.isPrimary))
                  navigation.replace('Home')
                } else {
                  setLoader(false)
                }
              })
              .catch((error) => {
                setLoader(false)
                console.log(error);
              });
          }
          else {
            setLoader(false)
            Toast.show(response.data.message)
          }
        })
        .catch(function (error) {
          setLoader(false)
          console.log("error", error)
          Toast.show(error.response.data.message)
        })
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#F9F4F1' }}>
      {loader ? <Loader /> : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS == "android" ? -200 : 100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{}}>
            <View style={styles.main}>
              <Image style={[styles.logo, { resizeMode: 'contain' }]} source={require('../../../assets/Logo/Zbwa1.png')} />
            </View>
            <View style={[styles.container, { marginTop: 30, height: 350 }]}>
              <LinearGradient
                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.yellow}>

                <View style={styles.view}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.signup}>Sign up </Text>
                    <Text style={styles.free}>for free</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('LoginFirst')}>
                       <LinearGradient
                    colors={['#AEAEAE', '#969998', '#4A4A4A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.arrowContainer}>
                    <ForwardArrow />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <LinearGradient
                    colors={['#AEAEAE', '#969998', '#4A4A4A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.black}>

                    <View style={{ paddingHorizontal: 40, marginTop: 10 }}>
                      <Text style={styles.already}>Already Registered user?</Text>
                      <Text style={styles.login}>Login</Text>
                      <View style={styles.country}>
                        <Text style={styles.ninety}>+91</Text>
                        <TextInput style={styles.input}
                          placeholder="Phone Number"
                          placeholderTextColor={'#FFFFFF'}
                          value={mobile}
                          contextMenuHidden
                          onChangeText={(val) => {
                            const regex = /^\d{0,10}$/
                            if (regex.test(val)) {
                              setMobile(val)
                            }
                          }}
                          keyboardType="number-pad"
                          maxLength={10}
                        />
                      </View>
                      <View style={styles.inputContainer}>

                        <TextInput style={styles.pass}
                          placeholder="Password"
                          placeholderTextColor={'#FFFFFF'}
                          keyboardType="default"
                          value={password}
                          onChangeText={(val) => setPassword(val)}
                          secureTextEntry={visible}
                        />
                        {visible ?
                          <TouchableOpacity
                            style={{ padding: 6 }}
                            onPress={() => setVisible(!visible)}>
                            <Eye />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            style={{ padding: 6 }}
                            onPress={() => setVisible(!visible)}>
                            <Eye1 />
                          </TouchableOpacity>
                        }
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          onPress={() => navigation.navigate('Forgot')}
                          style={styles.forgot}>Forgot Password?</Text>
                        <Text
                          onPress={() => navigation.navigate('Pin', { mobile: mobile })}
                          style={styles.mpin}>Login with mPIN</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 30, alignItems: 'flex-end' }}>
                      <TouchableOpacity
                        onPress={() =>
                          // navigation.replace('Home')
                          userLogin()
                        }>
                        <LinearGradient
                          colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.button}>
                          <Text style={styles.text}>Login</Text>
                          <Arrow />
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>


                  </LinearGradient>
                </View>

              </LinearGradient>
            </View>
          </View>
          <View style={{ height: 140 }} />
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  )
}
export default Login;