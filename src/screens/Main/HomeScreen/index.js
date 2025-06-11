import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ImageBackground,
  SafeAreaView,
  Platform,
} from 'react-native';
import Menu from '../../../assets/Icon/Menu1.svg';
import Bell from '../../../assets/Icon/HeaderBell1.svg';
import { ImageSlider } from 'react-native-image-slider-banner';
import BottomTab from '../../../components/BottomTab';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import Storage from '../../../components/LocalStorage';
import styles from './style';
import CircleCross from '../../../assets/Icon/CircleCross.svg';
import Call from '../../../assets/Icon/Call.svg';
import Gmail from '../../../assets/Icon/Gmail.svg';
import Whatsapp from '../../../assets/Icon/Whatsapp.svg';
import Image15 from '../../../assets/HomeImage/image15.svg';
import Image16 from '../../../assets/HomeImage/image16.svg';
import Image17 from '../../../assets/HomeImage/image17.svg';
import Image18 from '../../../assets/HomeImage/image18.svg';
import Image19 from '../../../assets/HomeImage/image19.svg';
import Image20 from '../../../assets/HomeImage/image20.svg';
import Image22 from '../../../assets/HomeImage/image22.svg';
import Image23 from '../../../assets/HomeImage/image23.svg';
import Image24 from '../../../assets/HomeImage/image24.svg';
import Image25 from '../../../assets/HomeImage/image25.svg';
import Image26 from '../../../assets/HomeImage/image26.svg';
import Facebook from '../../../assets/HomeImage/facevents.svg';
import News from '../../../assets/HomeImage/news.svg';
import Image27 from '../../../assets/HomeImage/image27.svg';
import Image37 from '../../../assets/HomeImage/members.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../../Redux/Constants';
import Contact from '../HomeComponets/Contact';
import Cross from '../../../assets/Icon/CircleCross1';
import { useDispatch, useSelector } from 'react-redux';
import { handleUnauthorizedError } from '../../../components/SessionExpire';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
const HomeScreen = () => {
  const { showHome } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const [isPremium, setPremium] = useState(false);
  const [loader, setLoader] = useState(false);
  const [banner, setBanner] = useState([]);
  const [contact, setContact] = useState();
  const [showMember, setShowMember] = useState('');
  const [secondary, setSecondary] = useState('');
  const isFocus = useIsFocused();
  const [showModal, setShowModal] = useState(showHome);
  const [companyprofile, setCompnayProfile] = useState(null);
  // const [bannerUrl, setBannerUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fullState = useSelector(state => state.bannerUrl);
  console.log(fullState, 'Full Redux State');

  useEffect(() => {
    if (imageLoaded) {
      setShowModal(true);
    }
  }, [imageLoaded]);

  useEffect(() => {
    handleBannerData();
    apiCall();
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(false);
    }, 10000);
  }, [0]);

  useEffect(() => {
    handleMember();
    // updateMemberdata()
  }, [isFocus]);

  // useEffect(() => {
  //   handleBannerData1();
  // }, []);

  // const handleBannerData1 = async () => {
  //   try {
  //     setLoader(true);
  //     console.log('Calling banner API without token...');
  //     const response = await axios.get(
  //       `${Constants.MainUrl}logistic/banner/get`,
  //     );

  //     if (response?.data?.code === 200) {
  //       const imageUrl = response?.data?.data?.banner_image;
  //       const fullBannerUrl =
  //         imageUrl?.startsWith('http') || imageUrl?.startsWith('https')
  //           ? imageUrl
  //           : `${Constants.MainUrl}${imageUrl}`;

  //       console.log('Full Banner URL:', fullBannerUrl);

  //         const prefetchResult = await Image.prefetch(fullBannerUrl);

  //       if (prefetchResult) {

  //         setBannerUrl(fullBannerUrl);
  //         setShowModal(true);
  //       } else {
  //         Toast.show('Image failed to preload');
  //       }
  //     } else {
  //       Toast.show(response.data.message || 'Something went wrong');
  //     }
  //   } catch (error) {
  //     console.log('API Error:', error?.message || error);
  //     Toast.show('Failed to fetch banner');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleMember = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}user/check/my/status`,
      headers: {
        Authorization: `${user_token}`,
      },
    };
    setLoader(true);
    axios
      .request(config)
      .then(response => {
        console.log('this is response12132332', response.data);
        if (response.data.code == '200') {
          setLoader(false);

          AsyncStorage.setItem('Member', response.data.message);
          AsyncStorage.setItem(
            'isMember',
            JSON.stringify(response.data.data.member),
          );
          AsyncStorage.setItem(
            'isSecondary',
            JSON.stringify(response.data.data.secondary),
          );
          setSecondary(response.data.data.secondary);
          console.log(
            'ttittitit>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
            response.data.data.member,
          );

          AsyncStorage.setItem(
            'Member_id',
            JSON.stringify(response.data.data.member_id),
          );
          AsyncStorage.setItem('Member_dob', response.data.data.dob);
          AsyncStorage.setItem(
            'Member_contact',
            response.data.data.emergencyContactNumber,
          );
          setShowMember(response.data.message);
        } else {
          AsyncStorage.setItem(
            'Member_id',
            JSON.stringify(response.data.data.member_id),
          );
          AsyncStorage.setItem('Member_dob', response.data.data.dob);
          AsyncStorage.setItem(
            'Member_contact',
            response.data.data.emergencyContactNumber,
          );
          AsyncStorage.setItem('Member', response.data.message);
          AsyncStorage.setItem(
            'isMember',
            JSON.stringify(response.data.data.member),
          );
          AsyncStorage.setItem(
            'isSecondary',
            JSON.stringify(response.data.data.secondary),
          );
          setSecondary(response.data.data.secondary);

          console.log(
            'ttittitit>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
            response.data.data.member,
          );
          setLoader(false);
          setShowMember(response.data.message);
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
  };

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}homepage/contact/us`,
      headers: {
        Authorization: `${user_token}`,
      },
    };
    setLoader(true);
    axios
      .request(config)
      .then(response => {
        if (response.data.code == '200') {
          // Toast.show(response.data.message)
          setContact(response.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(response.data.message);
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
  };

  const fetchData = async () => {
    setLoader(true);
    try {
      const user_token = await AsyncStorage.getItem('user_token');
      const user_id = await AsyncStorage.getItem('user_id');
      // console.log(user_token, '00000000000000111111111111');
      // console.log(user_id, '000000000000000001111111111111111111111');
      const config = {
        method: 'get',
        url: `${Constants.MainUrl}member/get/company/profile/details/${user_id}`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      const response = await axios(config);
      // console.log('00000000000000000111111111111111111111122222222222', response.data)
      if (response.data.code === 200) {
        const data = response.data.data;
        setCompnayProfile(data);
      } else if (response.data.code === 400) {
        navigation.navigate('MemberDirectoryTemplate');
      } else {
        console.log('API Error:', response.data.message);
      }
    } catch (err) {
      console.log('API Error:', err);
    } finally {
      setLoader(false);
    }
  };

  const handleBannerData = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    let arr = [];
    setLoader(true);
    axios({
      method: 'get',
      url: `${Constants.MainUrl}slider/all`,
      headers: `Authorization: ${user_token}`,
      // headers: `Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjU0NzMzMjNkM2U4MDMyN2M3MGJhYSIsIm5hbWUiOiJOYXJlbmRyYSBQYWwiLCJpYXQiOjE3MzMyMjkzMTQsImV4cCI6MTc0MTAwNTMxNH0.PopO_F_H9yc2nBqe6ymzisyGHNvaD2Dve_Ea7m7_ag4`,
    })
      .then(function (response) {
        console.log('API Response:home', response);
        if (response.data.code == '200') {
          response.data.data.map(item => arr.push({ img: item.banner }));
          setBanner(arr);
          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(response.data.message);
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
  };

  const onItemPress = async title => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);

    if (title == 'ZBW News') {
      navigation.navigate('ZBWNews');
    } else if (title == 'Events') {
      navigation.navigate('Events');
    } else if (title == 'Become a Member') {
      navigation.navigate('BecomeAMember');
    } else if (title == 'Our Team') {
      navigation.navigate('OurTeam');
    } else if (title == 'Our Achievements') {
      Alert.alert('Coming soon.');
      // navigation.navigate('OurAchievements')
    } else if (title == 'WHY BECOME A\nMEMBER ?') {
      // Alert.alert('Coming soon.');
      navigation.navigate('WhyBecomeDrawer');
    } else if (title == 'Chauvihar Event') {
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}chouviharevent/all`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      setLoader(true);
      axios
        .request(config)

        .then(response => {
          if (response.data?.code == 200) {
            dispatch({
              type: 'set_Chauvihar_event_page',
              payload: response.data?.data,
            });
            // set_Chauvihar_event
            navigation.navigate('ChauviharEventDetails');
          } else {
            Toast.show(response.data?.message);
          }
          setLoader(false);
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

      // navigation.navigate('ChouviharEvent');
    } else if (title == 'Secondary Member') {
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}member/secondary/member/list`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      setLoader(true);
      axios
        .request(config)

        .then(response => {
          console.log('this is member data', showMember);
          if (showMember == 'Not a member') {
            setLoader(false);
            setPremium(true);
          } else {
            setLoader(false);
            navigation.navigate('SecondaryMember');
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

      // navigation.navigate('SecondaryMember')
    } else if (title == 'Legal Support') {
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}legalsupport/all/1`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      setLoader(true);
      axios
        .request(config)
        .then(response => {
          if (showMember == 'Not a member') {
            setLoader(false);
            setPremium(true);
          } else {
            setLoader(false);
            navigation.navigate('LegalSupport');
          }
        })
        .catch(error => {
          setLoader(false);
          console.log(error);
        });
    } else if (title == 'Order Copies') {
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}ordercopie/all/1`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      setLoader(true);
      axios
        .request(config)
        .then(response => {
          if (showMember == 'Not a member') {
            setLoader(false);
            setPremium(true);
          } else {
            setLoader(false);
            navigation.navigate('OrderCopies');
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
    } else if (title == 'Complaints') {
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}complaint/all`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      setLoader(true);
      axios
        .request(config)

        .then(response => {
          console.log('this is response', response.data);
          if (showMember == 'Not a member') {
            setLoader(false);
            setPremium(true);
          } else {
            setLoader(false);
            navigation.navigate('Complaints');
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
    } else if (title == 'Price Chart') {
      navigation.navigate('Market');
    } else if (title == 'Our Partners') {
      navigation.navigate('OurPartner');
    } else if (title == 'Our Company Profile') {
      if (Object.keys(companyprofile).length == 0) {
        navigation.navigate('MemberDirectorys');
      } else {
        navigation.navigate('MemberDirectoryTemplate');
      }
    } else if (title == 'Member Directory & Catalogue') {
      navigation.navigate('Memberdirectory');
    } else if (title == 'Facebook Event') {
      navigation.navigate('FacebookEventsPage');
    } else if (title == 'Newsletter') {
      navigation.navigate('Newsletters');
    }
  };

  const openWhatsApp = (phoneNumber, message = 'Hi') => {
    if (!phoneNumber) return;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      if (Platform.OS === 'ios') {
        Linking.openURL('https://apps.apple.com/us/app/whatsapp-messenger/id310633997');
      } else {
        Linking.openURL('https://play.google.com/store/apps/details?id=com.whatsapp');
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* <SafeAreaView style={{flex:1}}> */}
      {loader ? <Loader /> : null}
      <LinearGradient
        colors={['#DDAC17', '#FFFA8A', '#ECC440']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}>
        {/* <View style={styles.header}> */}

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Menu width={25} height={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Bell width={25} height={25} />
        </TouchableOpacity>
        {/* </View> */}
      </LinearGradient>
      <ScrollView style={{}}>
        <View style={{ alignItems: 'flex-end' }}>
          <Image
            style={styles.img}
            source={require('../../../assets/HomeImage/image7.png')}
          />
        </View>
        <View style={styles.slider}>
          {banner.length > 1 ? (
            <ImageSlider
              data={banner}
              // localImg
              autoPlay={true}
              preview={false}
              caroselImageContainerStyle={{
                width: Dimensions.get('window').width,
                // paddingRight:10,
                marginRight: 0,
              }}
              caroselImageStyle={{
                width: Dimensions.get('window').width - 40,
                height: 180,
                justifyContent: 'space-between',
                borderWidth: 1,
                borderRadius: 20,
                marginLeft: 20,
                // resizeMode: 'center',
                resizeMode: Platform.OS == 'ios' ? 'contain' : 'center',
              }}
              indicatorContainerStyle={{
                bottom: -25,
              }}
              inActiveIndicatorStyle={{
                backgroundColor: '#000000',
                height: 8,
                width: 8,
              }}
              activeIndicatorStyle={{
                backgroundColor: '#FFD387',
                height: 8,
                width: 8,
              }}
            />
          ) : (
            <View style={{ marginTop: -20 }}>
              <Image
                // resizeMode="contain"
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 180,
                  borderWidth: 1,
                  borderRadius: 20,
                  resizeMode: 'contain',
                }}
                source={{ uri: banner[0]?.img }}
              />
            </View>
          )}
        </View>
        <View style={{ marginTop: -24 }}>
          <Image
            style={styles.img1}
            source={require('../../../assets/HomeImage/image8.png')}
          />
        </View>
        <View style={styles.view}>
          <FlatList
            data={
              showMember == 'Not a member'
                ? data
                : secondary == 1
                  ? data3
                  : data2
            }
            numColumns={2}
            renderItem={({ item, index }) => (
              // <TouchableOpacity
              //   activeOpacity={0.5}
              //   onPress={() => onItemPress(item.name)}
              //   style={styles.item}>
              //   {item.img}
              //   <Text style={[styles.name, {textAlign: 'center'}]}>
              //     {item.name}
              //   </Text>
              // </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onItemPress(item.name)}
                style={{
                  width: Platform.isPad ? '47.4%' : '44%',
                  height: 150,
                  margin: 10,
                  borderRadius: 10,
                  shadowColor: '#ECC440',
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 2, height: 2 },
                  shadowRadius: 20,
                  elevation: 5,
                  overflow: 'hidden',
                }}>
                <LinearGradient
                  colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.img}
                  <Text style={[styles.name, { textAlign: 'center' }]}>
                    {item.name}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        style={{ margin: 0 }}>
        <View
          style={{
            height: Dimensions.get('window').height,
            backgroundColor: '#000',
          }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ImageBackground
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
              source={{ uri: fullState }}
              onLoadEnd={() => setImageLoaded(true)}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{ alignSelf: 'flex-end', margin: 20, marginTop: 80 }}>
                <Cross />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: '#F9F4F1',
            height: 125,
            borderRadius: 16,
            paddingLeft: 20,
            width: '84%',
            borderWidth: 1,
            borderColor: '#FFD387',
            alignSelf: 'center',
          }}>
          <View style={styles.row}>
            <Text style={styles.contact}>Contact Us</Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.touch}>
              <CircleCross />
            </TouchableOpacity>
          </View>
          <View style={styles.view1}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                Linking.openURL(`tel:${contact.phone}`);
              }}
              style={styles.touch1}>
              <Call />
              <Text style={styles.text}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                Linking.openURL(`mailto:${contact.email}`);
                // Linking.openURL(`tel:${contact.phone}`)
              }}
              style={styles.emailContainer}>
              <Gmail />
              <Text style={styles.email}>Gmail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openWhatsApp(contact?.whatsapp); // pass number only
                setVisible(false);
              }}
              style={styles.touch2}
            >
              <Whatsapp />
              <Text style={styles.text}>Whatsapp</Text>
            </TouchableOpacity>


          </View>
        </View>
      </Modal>
      <Modal isVisible={isPremium}>
        <View style={styles.modal}>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-Bold',
                fontSize: 18,
              }}>
              Go Pro!
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
                textAlign: 'center',
              }}>
              {'Become a member and join access to all the premium features'}
            </Text>
          </View>
          <View style={styles.view1}>
            <FlatList
              data={data1}
              numColumns={2}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  // onPress={() => onItemPress(item.name)}
                  style={styles.item}>
                  {item.img}
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => {
                onItemPress('Become a Member');
                setPremium(false);
              }}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontFamily: 'Montserrat-Bold',
                }}>
                Become a member
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text
              onPress={() => setPremium(false)}
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                color: '#000',
              }}>
              NO THANKS
            </Text>
          </View>
        </View>
      </Modal>
      <BottomTab onPress={() => setVisible(true)} showMember={showMember} />
      {/* </SafeAreaView> */}
    </View>
  );
};
export default HomeScreen;

const data1 = [
  {
    img: <Image27 height={50} width={50} />,
    name: `Chauvihar Event`,
  },
  {
    img: <Image18 />,
    name: 'Complaints',
  },
  {
    img: <Image17 />,
    name: 'Secondary Member',
  },
  {
    img: <Image22 />,
    name: 'Order Copies',
  },
  {
    img: <Image23 />,
    name: 'Legal Support',
  },
  {
    img: <Image23 />,
    name: 'Legal Support',
  },
];

const data = [
  {
    img: <Image37 height={50} width={50} />,
    name: `Member Directory & Catalogue`,
  },
  {
    img: <Image27 height={50} width={50} />,
    name: `Chauvihar Event`,
  },
  {
    img: <Image15 />,
    name: 'ZBW News',
  },
  {
    img: <Image16 />,
    name: 'Become a Member',
  },
  {
    img: <Image17 />,
    name: 'Secondary Member',
  },
  {
    img: <Image18 />,
    name: 'Complaints',
  },
  {
    img: <Image19 />,
    name: 'Events',
  },
  {
    img: <Image20 />,
    name: 'Our Partners',
  },
  {
    img: <Image22 />,
    name: 'Order Copies',
  },

  // {
  //     img: <Image21 />,
  //     name: 'Price Chart'
  // },
  {
    img: <Image23 />,
    name: 'Legal Support',
  },
  {
    img: <Image24 />,
    name: 'Our Team',
  },
  {
    img: <Image25 />,
    name: 'Our Achievements',
  },
  {
    img: <Image26 />,
    name: 'WHY BECOME A\nMEMBER ?',
  },
];

const data2 = [
  {
    img: <Image37 height={50} width={50} />,
    name: `Member Directory & Catalogue`,
  },
  {
    img: <Image27 height={50} width={50} />,
    name: `Chauvihar Event`,
  },
  {
    img: <Image15 />,
    name: 'ZBW News',
  },
  {
    img: <Image17 />,
    name: 'Secondary Member',
  },
  {
    img: <Image18 />,
    name: 'Complaints',
  },
  {
    img: <Image19 />,
    name: 'Events',
  },
  {
    img: <Image20 />,
    name: 'Our Partners',
  },
  {
    img: <Image22 />,
    name: 'Order Copies',
  },
  // {
  //     img: <Image21 />,
  //     name: 'Price Chart'
  // },
  {
    img: <Image23 />,
    name: 'Legal Support',
  },
  {
    img: <Image24 />,
    name: 'Our Team',
  },
  {
    img: <Image25 />,
    name: 'Our Achievements',
  },
  {
    img: <Image26 />,
    name: `WHY BECOME A\nMEMBER ?`,
  },

  {
    img: <Facebook width={45} height={45} />,
    name: `Facebook Event`,
  },
  {
    img: <News width={45} height={45} />,
    name: `Newsletter`,
  },
];
const data3 = [
  {
    img: <Image37 height={50} width={50} />,
    name: `Member Directory & Catalogue`,
  },
  {
    img: <Image27 height={50} width={50} />,
    name: `Chauvihar Event`,
  },
  {
    img: <Image15 />,
    name: 'ZBW News',
  },
  // {
  //   img: <Image17 />,
  //   name: 'Secondary Member',
  // },
  {
    img: <Image18 />,
    name: 'Complaints',
  },
  {
    img: <Image19 />,
    name: 'Events',
  },
  {
    img: <Image20 />,
    name: 'Our Partners',
  },
  {
    img: <Image22 />,
    name: 'Order Copies',
  },
  // {
  //     img: <Image21 />,
  //     name: 'Price Chart'
  // },
  {
    img: <Image23 />,
    name: 'Legal Support',
  },
  {
    img: <Image24 />,
    name: 'Our Team',
  },
  {
    img: <Image25 />,
    name: 'Our Achievements',
  },
  {
    img: <Image26 />,
    name: `WHY BECOME A\nMEMBER ?`,
  },
];
