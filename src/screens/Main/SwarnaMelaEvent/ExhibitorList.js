import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FiltersIcon from '../../../assets/EventSwarnMela/filtersIcon.svg';
import FilterIcon2 from '../../../assets/EventSwarnMela/filterIcon2.svg';
import LocationIcon from '../../../assets/EventSwarnMela/yellowLocationIcon.svg';
import CloseIcon from '../../../assets/EventSwarnMela/closeIcon.svg';
import SearchIcon from '../../../assets/EventSwarnMela/searchIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
 
const ExhibitorList = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [companyTypeValue, setCompanyTypeValue] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
 
  const companyTypeData = [
    {label: 'Private Limited', value: 'private'},
    {label: 'Partnership', value: 'partnership'},
    {label: 'Sole Proprietor', value: 'sole'},
    {label: 'LLP', value: 'llp'},
    {label: 'Public Limited', value: 'public'},
  ];
 
  const productType = [
    {id: '1', title: 'Diamond'},
    {id: '2', title: 'Gold'},
    {id: '3', title: 'Platinum'},
    {id: '4', title: 'Silver'},
    {id: '5', title: 'Stones'},
  ];
 
  const toggleProductTypeCheckbox = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
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
          Exhibitor Listing
        </Text>
 
        <View
          style={[
            styles.infoDetailSection,
            {borderRadius: 0, paddingVertical: 15},
          ]}>
          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                paddingHorizontal: 10,
              },
            ]}>
            <SearchIcon height={20} />
 
            <TextInput
              value={''}
              placeholder="Search exhibitors..."
              placeholderTextColor={'#ADAEBC'}
              // onChangeText={}
              keyboardType="number-pad"
              style={{
                color: '#000000',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                width: '80%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}>
              <FiltersIcon height={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({item}) => (
              <View
                style={[
                  styles.infoDetailSection,
                  {padding: 0, overflow: 'hidden'},
                ]}>
                <Image
                  source={require('../../../assets/EventSwarnMela/demoImg.jpg')}
                  style={{width: '100%', height: 150}}
                />
                <View style={{padding: 15}}>
                  <Text style={[styles.cardTitleheading, {marginBottom: 5}]}>
                    Royal Jewellers
                  </Text>
                  <Text style={styles.heading}>
                    Premium Gold & Diamond Collection
                  </Text>
                  <View style={styles.alignRow}>
                    <View style={[styles.alignRow, {gap: 5}]}>
                      <LocationIcon />
                      <Text style={styles.cardSubTitleText}>Hall A-12</Text>
                    </View>
                    <TouchableOpacity
                      style={{marginTop: 10}}
                      onPress={() => {
                        //for temprary
                        navigation.navigate('BookmarkList');
                      }}>
                      <LinearGradient
                        colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.cardBtn}>
                        <Text style={styles.btnText}>View Details</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
                {item == 1 || item == 3 ? (
                  <LinearGradient
                    colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.cardTag}>
                    <Text style={styles.btnText}>Gold</Text>
                  </LinearGradient>
                ) : (
                  <LinearGradient
                    colors={['#AEAEAE', '#969998', '#4A4A4A']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.cardTag}>
                    <Text style={[styles.btnText, {color: '#FFF'}]}>
                      Platinum
                    </Text>
                  </LinearGradient>
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        //   onRequestClose={onClose}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 10}}
              onPress={() => setIsVisible(false)}>
              <CloseIcon height={15} width={15} />
            </TouchableOpacity>
            <View style={[styles.infoDetailSection, {width: '100%'}]}>
              <View
                style={[
                  styles.alignRow,
                  {gap: 5, width: '20%', marginBottom: 10},
                ]}>
                <FilterIcon2 />
                <Text style={styles.moduleHeadingText}>Filter</Text>
              </View>
              <View style={styles.infoSectionCells}>
                <Text style={styles.modalHeading}>Exhibitor Category</Text>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: '#000'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={companyTypeData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Category"
                  value={companyTypeValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setCompanyTypeValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={styles.infoSectionCells}>
                <Text style={styles.modalHeading}>Product Type</Text>
                <FlatList
                  data={productType}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => toggleProductTypeCheckbox(item.id)}
                      style={styles.checkboxContainer}>
                      <View
                        style={{
                          borderWidth: 1,
                          height: 15,
                          width: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 2,
                          marginTop: 5,
                        }}>
                        {selectedIds.includes(item.id) && (
                          <View
                            style={{
                              backgroundColor: 'black',
                              height: '75%',
                              width: '75%',
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </View>
                      <View style={styles.labelContainer}>
                        <Text style={styles.heading}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => {
                  setIsVisible(false);
                }}>
                <LinearGradient
                  colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.cardBtn, {width: '100%'}]}>
                  <Text style={styles.modalHeading}>Apply</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ExhibitorList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    width: '100%',
    height: 100,
    // backgroundColor: '#FCDA64'
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  infoDetailSection: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
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
  moduleHeadingText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
  },
  cardSubTitleText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#EEAF2D',
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  modalHeading: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  cardTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  inputView: {
    height: 50,
    width: '100%',
    // marginTop: 5,
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
 
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBtn: {
    height: 40,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTag: {
    height: 30,
    borderRadius: 10,
    // width: 80,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    color: '#111827',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    width: '92%',
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dropdown: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  labelContainer: {
    marginLeft: 8,
  },
});
 