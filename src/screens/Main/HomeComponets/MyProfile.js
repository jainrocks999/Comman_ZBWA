import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import axios from "axios";
import Constants from "../../../Redux/Constants";
import { handleUnauthorizedError } from "../../../components/SessionExpire";

const Contact = () => {
  const navigation = useNavigation()
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()


  useEffect(() => {
    apiCall()
  }, [])

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token)
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}user/my/profile`,
      headers: {
        'Authorization': `${user_token}`
      }
    };
    setLoader(true)
    axios.request(config)
      .then((response) => {
        console.log('response', response.data);
        if (response.data.code == '200') {
          // Toast.show(response.data.message)
          setData(response.data.data)
          setLoader(false)
        }
        else {
          setLoader(false)
          setData(response.data.data)
          // Toast.show(response.data.message)
        }
      })
      .catch(async error => {
        setLoader(false);
        console.log('Error:', error);

        if (error.response && error.response.status === 401) {
          await handleUnauthorizedError(navigation);
        } else {
          Toast.show(error.response?.data?.message);
        }
      });

  }

  return (

    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {loader ? <Loader /> : null}
      <Header
        title={'My Profile'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      {data?.user ? <View style={{
        width: '93%',
        borderWidth: 1,
        borderColor: '#FFD387',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: '#F9F4F1',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignSelf: 'center',
        marginTop: 10
      }}>
        {data?.user?.firstName ? <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{`Name : ${data?.user?.firstName} ${data?.user?.lastName}`}</Text> : null}
        {data?.user?.businessName ? <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Montserrat-SemiBold', marginTop: 4 }}>{`Business Name : ${data?.user?.businessName}`}</Text> : null}
        {data?.user?.gst ? <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Montserrat-SemiBold', marginTop: 4 }}>{`GST Number : ${data?.user?.gst}`}</Text> : null}
        {data?.user?.phone ? <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Montserrat-SemiBold', marginTop: 4 }}>{`Phone Number : ${data?.user?.phone}`}</Text> : null}

      </View> : null}
    </View>
  )
}
export default Contact;