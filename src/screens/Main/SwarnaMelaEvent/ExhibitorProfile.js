import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  BackHandler,
  Image,
  Platform,
  FlatList,
  Linking,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LocationIcon from '../../../assets/EventSwarnMela/locationIcon.svg';
import InstagramIcon from '../../../assets/EventSwarnMela/instagram-svgrepo-com 1.svg';
import OfficeBuildingIcon from '../../../assets/EventSwarnMela/office-building-svgrepo-com 1.svg';
import PhoneIcon from '../../../assets/EventSwarnMela/phone-call-svgrepo-com 2.svg';
import WhatsAppIcon from '../../../assets/EventSwarnMela/whatsapp-icon.svg';
import BookmarkIcon from '../../../assets/EventSwarnMela/bookmarkIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');

const ExhibitorProfile = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsAppNo, setWhatsAppNo] = useState('');
  const [googleAddressLink, setGoogleAddressLink] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');
  const [directorPhoto, setDirectorPhoto] = useState([
    '../../../assets/EventSwarnMela/demoImg.jpg',
    '../../../assets/EventSwarnMela/demoImg.jpg',
    '../../../assets/EventSwarnMela/demoImg.jpg',
  ]);
  const [categoryImages, setCategoryImages] = useState([
    {image: 'https://via.placeholder.com/100x100.png?text=Ring', name: 'Ring'},
    {
      image: 'https://via.placeholder.com/100x100.png?text=Necklace',
      name: 'Necklace',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Earring',
      name: 'Earring',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Bracelet',
      name: 'Bracelet',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Pendant',
      name: 'Pendant',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Brooch',
      name: 'Brooch',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Brooch',
      name: 'Brooch',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Brooch',
      name: 'Brooch',
    },
    {
      image: 'https://via.placeholder.com/100x100.png?text=Brooch',
      name: 'Brooch',
    },
  ]);
  const [logoImage, setLogoImage] = useState([]);
  const [address, setAddress] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [membershipId, setMembershipId] = useState('');

  const flatListRef = useRef(null);
  const handleImagePress = imageUri => {
    setSelectedImage(imageUri);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (!directorPhoto || directorPhoto.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        if (directorPhoto.length === 0) return prevIndex;
        const nextIndex = (prevIndex + 1) % directorPhoto.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [directorPhoto.length]);
  const renderDirectorImage = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setActiveIndex(index);
        handleImagePress(item);
      }}>
      <Image
        source={require('../../../assets/EventSwarnMela/demoImg.jpg')}
        style={styles.directorImage}
      />
    </TouchableOpacity>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {directorPhoto.map((_, index) => (
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
  const chunkImages = images => {
    let result = [];
    for (let i = 0; i < images.length; i += 3) {
      result.push(images.slice(i, i + 3));
    }
    return result;
  };
  const getImageWidth = numImages => {
    const margin = 10;
    const totalMargin = margin * (numImages + 1);
    return (width - totalMargin) / numImages;
  };

  const handleEdit = () => {
    const cleanedCategoryImages = categoryImages.map(img => {
      const imageUri = img?.uri?.image || img?.image;
      const label = img?.name || '';
      const cleanLabel = label.includes('.')
        ? label.split('.').slice(0, -1).join('.')
        : label;
      return {
        ...img,
        name: cleanLabel,
        uri: {image: imageUri},
      };
    });

    console.log(cleanedCategoryImages, 'ffkfkfkfkfkf');
    navigation.navigate('MemberDirectorys', {
      editMode: true,
      name: name,
      directorName: Array.isArray(categoryDetail)
        ? categoryDetail
        : [categoryDetail],
      categoryDetail: Array.isArray(directorName)
        ? directorName
        : directorName.split(','),
      phone: phone,
      whatsAppNo: whatsAppNo,
      googleAddressLink: googleAddressLink,
      address: address,
      logoImage: logoImage?.uri || 'https://via.placeholder.com/120',
      directorPhoto: directorPhoto,
      // categoryImages: categoryImages,
      categoryImages: cleanedCategoryImages,
    });
  };

  useEffect(() => {
    const backAction = () => {
      if (isModalVisible) {
        setIsModalVisible(false);
        return true;
      }
      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [isModalVisible]);

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>Exhibitor Profile</Text>
        {/* {loading || loading ? <Loading /> : null} */}

        <View style={styles.infoDetailSection}>
          <View style={styles.card}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <LinearGradient
                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.hallBadge}>
                <LocationIcon height={20} />
                <Text style={styles.hallText}>Hall A-08</Text>
              </LinearGradient>

              <BookmarkIcon onPress={()=>{
                // for temprary
                navigation.navigate('ExhibitorList')
              }} />
            </View>
            {/* Main Row */}
            <View style={styles.row}>
              {/* Logo */}
              <Image
                source={require('../../../assets/EventSwarnMela/demoProimg.jpg')}
                style={styles.logo}
              />
              {/* Text Info */}
              <View style={{flex: 1, marginLeft: 10, gap: 5}}>
                <Text style={styles.formTitleheading}>Heritage Jewels</Text>
                <Text style={styles.heading}>
                  Traditional & Contemporary Gold
                </Text>
                <Text
                  style={styles.LinkText}
                  onPress={() =>
                    Linking.openURL('https://www.heritage-jewel.com')
                  }>
                  www.heritage-jewel.com
                </Text>
              </View>
            </View>

            {/* Icon Row */}
            <View style={styles.iconRow}>
              <View style={styles.iconItem}>
                <OfficeBuildingIcon />
                <Text style={styles.heading}>Office Address</Text>
              </View>
              <View style={styles.iconItem}>
                <PhoneIcon />
                <Text style={styles.heading}>Call Support</Text>
              </View>
              <View style={styles.iconItem}>
                <InstagramIcon />
                <Text style={styles.heading}>Instagram Id</Text>
              </View>
              <View style={styles.iconItem}>
                <WhatsAppIcon />
                <Text style={styles.heading}>WhatsApp Chat</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.imageWrapper}>
          <FlatList
            ref={flatListRef}
            data={directorPhoto}
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

        <View
          style={[
            styles.imageWrapper,
            {marginVertical: 20, borderRadius: 10, overflow: 'hidden'},
          ]}>
          <Image
            source={require('../../../assets/EventSwarnMela/demoImg.jpg')}
            style={{height: 180}}
          />
        </View>

        <View style={styles.categoryImages}>
          {chunkImages(categoryImages).map((chunk, idx) => (
            <View key={`row-${idx}`} style={styles.row2}>
              {chunk.map((uri, index) => {
                const imageWidth = getImageWidth(3);
                const imageUri = typeof uri === 'string' ? uri : uri.image;
                const imageLabel = uri.name || '';

                return (
                  <View
                    key={`category-${idx}-${index}`}
                    style={{
                      //   marginHorizontal: 3,
                      alignItems: 'center',
                      width: imageWidth - 5,
                    }}>
                    <TouchableOpacity
                      onPress={() => handleImagePress(imageUri)}>
                      <Image
                        // source={{uri: imageUri}}
                        source={require('../../../assets/EventSwarnMela/demoimg2.jpg')}
                        style={[styles.categoryImage, {width: imageWidth - 5}]}
                      />
                    </TouchableOpacity>

                    <Text style={styles.imageLabel}>{'Royal Jewellers'}</Text>
                  </View>
                );
              })}

              {chunk.length < 3 &&
                Array.from({length: 3 - chunk.length}).map(
                  (_, placeholderIdx) => (
                    <View
                      key={`placeholder-${idx}-${placeholderIdx}`}
                      style={{
                        width: getImageWidth(3),
                        marginHorizontal: 3,
                        height: 100,
                        backgroundColor: 'transparent',
                      }}
                    />
                  ),
                )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default ExhibitorProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    width: '100%',
    height: 100,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  infoDetailSection: {
    borderWidth: 1,
    marginBottom: 10,
    paddingTop:5,
    paddingBottom:10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F9F4F1',
    borderColor: '#FFD387',
  },
  infoSectionCells: {
    gap: 10,
    marginBottom: 10,
  },
  infoTitleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  HeadingText: {
    marginVertical: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  SubHeadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#EEAF2D',
  },
  infoSubTitleText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  LinkText: {
    color: '#2D91EE',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  inputView: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faf7f5', // same as in image
    marginTop: 20,
  },
  galleryRow: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageBox: {
    width: '32%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFE58B',
    borderWidth: 1,
  },
  imageLabel: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  plusIcon: {
    fontSize: 24,
    color: '#F1B500',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: '90%',
    gap: 10,
  },

  hallBadge: {
    marginLeft: -20,
    alignSelf: 'flex-start',
    backgroundColor: '#F1C40F',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hallText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  iconItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  iconLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: '#333',
  },

  imageWrapper: {
    flexDirection: 'column',
  },
  directorImage: {
    width: width - 35,
    height: 180,
    marginHorizontal: 6,
    borderWidth: 1,
    resizeMode: 'cover',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 8,
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

  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    gap: 10,
  },
  categoryImage: {
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
