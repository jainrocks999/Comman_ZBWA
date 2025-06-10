import React,{useState,useEffect} from "react";
import { View,Text,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import axios from "axios";
import Constants from "../../../Redux/Constants";
import { handleUnauthorizedError } from "../../../components/SessionExpire";

const Contact =()=>{
    const navigation=useNavigation()
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState()

    useEffect(()=>{
      apiCall()
    },[])

    const apiCall=async()=>{
      const user_token=await AsyncStorage.getItem(Storage.user_token)
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}homepage/contact/us`,
        headers: { 
          'Authorization': `${user_token}`
        }
      };
      setLoader(true)
      axios.request(config)
      .then((response) => {
        if(response.data.code=='200'){
          //  Toast.show(response.data.message)
           setData(response.data.data)
           setLoader(false)
        }
        else{
          setLoader(false)
          Toast.show(response.data.message)
        }
        console.log(JSON.stringify(response.data));
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
    return(
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          {loader?<Loader/>:null}
          <Header
          title={'Contact Us'}
          onPress={()=>navigation.goBack()}
          onPress2={()=>navigation.navigate('Notification')}
          />
         {data? <View style={{
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
                alignSelf:'center',
                marginTop:15
                }}>
                  <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{`Phone Number : ${data.phone}`}</Text>
                  <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:6}}>{`Whatsapp Number : ${data.whatsapp}`}</Text>
                  <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:6}}>{`Email Address : ${data.email}`}</Text>
                  <Text style={{fontSize:15,color:'#000',fontFamily:'Montserrat-SemiBold',marginTop:6}}>{`Address : ${data.address}`}</Text>
          </View>:null}
       </View>
    )
}
export default Contact;