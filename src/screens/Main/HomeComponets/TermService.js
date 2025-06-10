import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, ImageBackground, StyleSheet} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import Constants from '../../../Redux/Constants';
import {handleUnauthorizedError} from '../../../components/SessionExpire';
import WebView from 'react-native-webview';

const Term = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
 const [webViewHeight, setWebViewHeight] = useState(100); 
  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);

    let config = {
      method: 'get',
      url: `${Constants.MainUrl}homepage/term/condition`,
      headers: {
        Authorization: `${user_token}`,
      },
    };
    setLoader(true);
    axios
      .request(config)
      .then(response => {
        if (response.data.code == '200') {
          // Toast.show(response.data.message);
          setData(response.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(response.data.message);
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
  };
  console.log('this is data', data);
return (
  <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    <Header
      title={'Terms of Service'}
      onPress={() => navigation.goBack()}
      onPress2={() => navigation.navigate('Notification')}
    />

    {loader ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </View>
    ) : (
      <ScrollView contentContainerStyle={{ padding: 12 }} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {data ? (
            <WebView
              originWhitelist={['*']}
              source={{
                html: `
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1" />
                      <style>
                        * {
                          margin: 0;
                          padding: 0;
                          box-sizing: border-box;
                        }
                        body {
                          padding: 10px;
                          background-color: transparent;
                        }
                      </style>
                      <script>
                        window.onload = function() {
                          window.ReactNativeWebView.postMessage(
                            document.documentElement.scrollHeight.toString()
                          );
                        };
                      </script>
                    </head>
                    <body>
                      ${data.trim()}
                    </body>
                  </html>
                `,
              }}
              style={{ height: webViewHeight, backgroundColor: 'transparent' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scrollEnabled={false}
              onMessage={event => {
                const height = parseInt(event.nativeEvent.data);
                if (!isNaN(height)) {
                  setWebViewHeight(height + 20); // Add extra spacing
                }
              }}
            />
          ) : null}
        </View>
      </ScrollView>
    )}
  </View>
);

};

export default Term;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#FFD387',
    backgroundColor: '#F9F4F1',
    borderRadius: 12,
    elevation: 4,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
