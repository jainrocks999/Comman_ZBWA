import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Platform, BackHandler } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForwardArrow from "../../../assets/Icon/ForwardArrow.svg";
import Arrow from "../../../assets/Icon/Arrow.svg";
import Eye from "../../../assets/Icon/eye5.svg"
import Eye1 from "../../../assets/Icon/eyes.svg"
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./style";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Constants from "../../../Redux/Constants";

const Login = () => {
  const route = useRoute();
  const navigation = useNavigation()
  // const [mobile,setMobile]=useState('')
  const [mobile, setMobile] = useState(route.params?.mobile || '');
  const [pin, setPin] = useState('')
  const [loader, setLoader] = useState(false)
  const [visible, setVisible] = useState(true)


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Login');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const userLogin = async () => {
    const fcm_token = await AsyncStorage.getItem(Storage.fcm_token)
    if (mobile == '') {
      Toast.show('Please enter your phone number')
    }
    else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number')
    }
    else if (pin == '') {
      Toast.show('Please enter your mPin')
    }
    else if (pin.length < 4) {
      Toast.show('Please enter 4 digit mMin')
    }
    else {
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/login`,
        data: {
          "mobile": mobile,
          "action": "mpin",
          "mpin": pin
        }
      })
        .then(function (response) {
          if (response.data.code == '200') {
            let data = JSON.stringify({
              "fcm_token": fcm_token == null ? '' : fcm_token
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
                  setLoader(false)
                  console.log('this is response.', response.data);
                  console.log('this is response1.', response1.data);

                  Toast.show(response.data.message)
                  AsyncStorage.setItem(Storage.user_id, response.data.data._id)
                  AsyncStorage.setItem(Storage.username, `${response.data.data.firstName} ${response.data.data.lastName}`)
                  AsyncStorage.setItem(Storage.user_token, response.data.data.token)
                  AsyncStorage.setItem(Storage.isPremium, JSON.stringify(response.data.data.isPrimary))
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
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
          console.log("error", error.response.data)
          Toast.show(error.response.data.message)
        })
    }
  }


  return (

    <View style={{ flex: 1, backgroundColor: '#F9F4F1' }}>
      {loader ? <Loader /> : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{
            // position:'absolute',bottom:150,left:0,right:0
          }}>
            <View style={styles.main}>
              <Image style={[styles.logo, { resizeMode: 'contain' }]} source={require('../../../assets/Logo/Zbwa1.png')} />
            </View>
            <View style={[styles.container, { marginTop: 25, height: 350 }]}>
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
                    onPress={() => navigation.navigate('Login')}>
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
                          contextMenuHidden
                          placeholder="Phone Number"
                          placeholderTextColor={'#FFFFFF'}
                          onChangeText={(value) => {
                            const regex = /^\d{0,10}$/;
                            if (regex.test(value)) {
                              setMobile(value)
                            }
                          }}
                          value={mobile}
                          keyboardType="number-pad"
                          maxLength={10}
                        />
                      </View>
                      <View style={styles.inputContainer}>

                        <TextInput style={styles.pass}
                          placeholder="mPin"
                          placeholderTextColor={'#FFFFFF'}
                          keyboardType="number-pad"
                          value={pin}
                          onChangeText={(value) => setPin(value)}
                          secureTextEntry={visible}
                          maxLength={4}
                        />
                        {/* <Eye /> */}
                        {visible ?
                          <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Eye />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Eye1 />
                          </TouchableOpacity>
                        }
                      </View>
                      <View style={{ marginTop: 0 }}>
                        <Text
                          onPress={() => navigation.navigate('Login')}
                          style={styles.mpin}>Login with Password</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 50, alignItems: 'flex-end' }}>
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