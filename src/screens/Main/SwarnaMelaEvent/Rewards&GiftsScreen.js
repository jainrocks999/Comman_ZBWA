import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import GiftsIcon from '../../../assets/EventSwarnMela/giftsIcon.svg';
import TrophyIcon from '../../../assets/EventSwarnMela/trophyIcon.svg';
import DiscountIcon from '../../../assets/EventSwarnMela/discountIcon.svg';
import PhoneIcon from '../../../assets/EventSwarnMela/fullYellowPhoneIcon.svg';
import ClockIcon from '../../../assets/EventSwarnMela/yellowclockIcon.svg';
import EmailIcon from '../../../assets/EventSwarnMela/yellowEmailIcon.svg';
import WhatsappIcon from '../../../assets/EventSwarnMela/whatsapp-icon.svg';
import SendIcon from '../../../assets/EventSwarnMela/sendIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

const {width} = Dimensions.get('window');

const RewardsGiftsScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [inquiryTypeValue, setInquiryTypeValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [prizeData, setPrizeData] = useState([
    {
      id: 1,
      img: require('../../../assets/EventSwarnMela/gold-1kilo.png'),
      prizeRank: '1st Prize',
      title: '1KG + 1KG Gold Bar',
      subTitle: '2 Crores - 2 KG Gold Bar',
    },
    {
      id: 2,
      img: require('../../../assets/EventSwarnMela/silver-1kilo.png'),
      prizeRank: '2nd Prize',
      title: '100KG  Silver Bar',
      subTitle: '1 Crores - 100 KG Silver',
    },
  ]);

  const dailyPriceData = [
    {
      id: 1,
      img: require('../../../assets/EventSwarnMela/thar.png'),
      title: '1 Thar Everyday',
      subTitle: '11 Thar',
    },
    {
      id: 2,
      img: require('../../../assets/EventSwarnMela/watch.png'),
      title: '2 Rado Watches Everyday',
      subTitle: '22 Watches',
    },
    {
      id: 3,
      img: require('../../../assets/EventSwarnMela/coin.png'),
      title: '20gm 1 Gold Coin Everyday',
      subTitle: '11 Gold Coins',
    },
    {
      id: 4,
      img: require('../../../assets/EventSwarnMela/iphone.png'),
      title: '2 iphone Everyday',
      subTitle: '22 iphones',
    },
    {
      id: 5,
      img: require('../../../assets/EventSwarnMela/silver-1kilo.png'),
      title: '5- 500gm Silver Bar Everyday',
      subTitle: '55 Silver Bars',
    },
    {
      id: 6,
      img: require('../../../assets/EventSwarnMela/cheque.png'),
      title: '20 Cheques 21 Thousand Everyday',
      subTitle: '240 Cheques',
    },
  ];
  const couponsData = [
    {
      id: 1,
      title: 'Gold Coupon',
      subTitle: '1 Coupon every\n5 Lakh sale To, Buyer',
    },
    {
      id: 2,
      title: 'Silver/Platinum Coupon',
      subTitle: '1 Coupon every\n1 Lakh sale To, Buyer',
    },
    {
      id: 3,
      title: 'Diamond Coupon',
      subTitle: '1 Coupon every\n2 Lakh sale To, Buyer',
    },
  ];

  useEffect(() => {
    if (!prizeData || prizeData.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        if (prizeData.length === 0) return prevIndex;
        const nextIndex = (prevIndex + 1) % prizeData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [prizeData.length]);

  const renderDirectorImage = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setActiveIndex(index);
        handleImagePress(item);
      }}>
      <View style={styles.directorImage}>
        <View
          style={[
            styles.rowView,
            {justifyContent: 'space-between', marginBottom: 15},
          ]}>
          <Text style={styles.cardTitle}>{item?.prizeRank}</Text>
          <GiftsIcon />
        </View>
        <LinearGradient
          colors={['#DDAC17', '#FFFA8A', '#ECC440']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.cardBtn,
            {gap: 15, paddingVertical: 20, paddingLeft: 20},
          ]}>
          <View
            style={{
              height: 90,
              width: 90,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={`${item?.img}`}
              style={{
                height: '80%',
                width: '80%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={styles.cardInfoSection}>
            <Text style={[styles.semiboldText, {width: '90%'}]}>
              {item?.title}
            </Text>
            <Text style={styles.heading}>{item?.subTitle}</Text>
          </View>
        </LinearGradient>
      </View>
      {/* <Image
        source={require('../../../assets/EventSwarnMela/demoImg.jpg')}
        style={styles.directorImage}
      /> */}
    </TouchableOpacity>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {prizeData.map((_, index) => (
          <View key={index} style={[styles.dotWrapper, {marginHorizontal: 4}]}>
            <View
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.dotColor,
                {
                  borderWidth: 1,
                  width: 10,
                },
              ]}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1}}>
        <Text style={[styles.HeadingText, {paddingHorizontal: 15}]}>
          Rewards & Gifts
        </Text>

        <View style={{backgroundColor: '#fff', padding: 20}}>
          <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cardBtn}>
            <Text style={styles.semiboldText}>Bumper Draw 3 Cores</Text>
          </LinearGradient>
        </View>

        <View style={styles.imageWrapper}>
          <FlatList
            ref={flatListRef}
            data={prizeData}
            renderItem={renderDirectorImage}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onScroll={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const index = Math.floor(contentOffsetX / (width - 35));
              setActiveIndex(index);
            }}
            initialScrollIndex={activeIndex}
          />
          {renderDots()}
        </View>

        <View style={[styles.infoDetailSection, {marginHorizontal: 15}]}>
          <View
            style={[
              styles.rowView,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={styles.semiboldText}>Daily Gift Prize</Text>
            <TrophyIcon />
          </View>
          <Text style={[styles.heading, {width: '90%'}]}>
            (Daily Prize 11 Days) 6th October 2025 to 10th October 2025
          </Text>
          <FlatList
            data={dailyPriceData}
            contentContainerStyle={{gap: 10, marginTop: 20}}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  styles.cardBtn,
                  {gap: 15, paddingVertical: 20, paddingLeft: 20, height: 120},
                ]}>
                <View style={styles.cardImgContainer}>
                  <Image
                    source={`${item?.img}`}
                    style={[
                      styles.dailypriceImg,         
                      item?.title.includes('Thar') && {
                        height: '100%',
                        width: '100%',
                      },
                    ]}
                  />
                </View>
                <View style={styles.cardInfoSection}>
                  <Text style={[styles.semiboldText]}>{item?.title}</Text>
                  <Text style={styles.heading}>{item?.subTitle}</Text>
                </View>
              </LinearGradient>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={[styles.infoDetailSection, {marginHorizontal: 15}]}>
          <View
            style={[
              styles.rowView,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={styles.semiboldText}>COUPON</Text>
            <DiscountIcon />
          </View>

          <FlatList
            data={couponsData}
            contentContainerStyle={{gap: 10, marginTop: 20}}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#AEAEAE', '#969998', '#4A4A4A']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  styles.cardBtn,
                  {gap: 15, paddingVertical: 20, paddingLeft: 10, height: 120},
                ]}>
                <View style={styles.cardSerialNoContianer}>
                  <Text style={styles.serialNoText}>{item?.id}</Text>
                </View>
                <View
                  style={[
                    styles.cardInfoSection,
                    {
                      width: '70%',
                      paddingBottom: 5,
                    },
                  ]}>
                  <Text style={[styles.semiboldText, {color: '#fff'}]}>
                    {item?.title}
                  </Text>
                  <Text style={[styles.heading, {color: '#fff'}]}>
                    {item?.subTitle}
                  </Text>
                </View>
              </LinearGradient>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default RewardsGiftsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    width: '100%',
    height: 100,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFD387',
    overflow: 'hidden',
    height: 300,
    width: '100%',
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
  HeadingText: {
    marginVertical: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  serialNoText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  cardTitle: {
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  semiboldText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  cardImg: {
    alignSelf: 'flex-start',
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  cardBtn: {
    // height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBtn: {
    height: 45,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  inputView: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  infoSectionCells: {
    gap: 10,
    marginBottom: 10,
  },
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    position: 'relative',
  },
  dotWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 4,
    borderColor: '#EEAF2D',
  },
  activeDot: {
    backgroundColor: '#EEAF2D',
  },
  imageWrapper: {
    marginVertical: 20,
    paddingLeft: 15,
    flexDirection: 'column',
  },
  directorImage: {
    width: width - 35,
    height: 200,
    marginHorizontal: 6,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
    padding: 15,
  },
  cardImgContainer: {
    height: 90,
    width: 90,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardSerialNoContianer: {
    height: 40,
    width: 40,
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dailypriceImg: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  cardInfoSection: {
    width: '62%',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 10,
  },
});
