import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LocationIcon from '../../../assets/EventSwarnMela/locationIcon.svg';
import InfoIcon from '../../../assets/EventSwarnMela/infoIcon.svg';
import Header from '../../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';

const ExhibitorRegister = () => {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [companyTypeValue, setCompanyTypeValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const toggleCheckbox = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const toggleProductCateCheckbox = id => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const membershipOptions = [
    {id: '1', title: 'ZBF Ratna Samraat', price: 'Rs. 51,00,000 + GST'},
    {id: '2', title: 'ZBF Maharathi', price: 'Rs. 21,00,000 + GST'},
    {id: '3', title: 'ZBF Shresth Sadasya', price: 'Rs. 11,00,000 + GST'},
    {id: '4', title: 'ZBF Gaurav Udyami', price: 'Rs. 5,00,000 + GST'},
    {id: '5', title: 'ZBF Ke Abhiman', price: 'Rs. 2,00,000 + GST'},
  ];
  const productCategory = [
    {id: '1', title: 'Diamond Jewellery'},
    {id: '2', title: 'Gold Jewellery'},
    {id: '3', title: 'Lab-Grown Diamonds'},
    {id: '4', title: 'Silver Jewellery'},
    {id: '5', title: 'Loose Stones'},
  ];

  const companyTypeData = [
    {label: 'Private Limited', value: 'private'},
    {label: 'Partnership', value: 'partnership'},
    {label: 'Sole Proprietor', value: 'sole'},
    {label: 'LLP', value: 'llp'},
    {label: 'Public Limited', value: 'public'},
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <Header
        title={''}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView style={{flexGrow: 1, paddingHorizontal: 15}}>
        <Text style={styles.HeadingText}>Exhibitor Registration</Text>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Account Information</Text>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Email Address<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder=""
                keyboardType="email-address"
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Company PAN<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder=""
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              GSTIN Status<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedOption('yes')}>
                <View style={styles.circle}>
                  {selectedOption === 'yes' && (
                    <View style={styles.selectedDot} />
                  )}
                </View>
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedOption('no')}>
                <View style={styles.circle}>
                  {selectedOption === 'no' && (
                    <View style={styles.selectedDot} />
                  )}
                </View>
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Company GSTIN<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder=""
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={[styles.heading, {fontFamily: 'Montserrat-SemiBold'}]}>
              Choose Participation Package<Text style={{color: 'red'}}>*</Text>
            </Text>
            <FlatList
              data={membershipOptions}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item.id)}
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
                    <Text style={styles.heading}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={[styles.heading, {fontSize: 12}]}>
              Add membership Details
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder=""
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Contact Person Details</Text>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Full Name<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Designation</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Mobile Number<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                keyboardType="number-pad"
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Email ID</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="email-address"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoDetailSection}>
          <Text style={styles.formTitleheading}>Company Information</Text>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>
              Company Type<Text style={{color: 'red'}}>*</Text>
            </Text>
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
              placeholder="Select Type"
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
            <Text style={styles.heading}>
              Company Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Address</Text>
            <View style={[styles.inputView, {height: 90}]}>
              <TextInput
                value={''}
                multiline
                numberOfLines={4}
                // onChangeText={}
                style={{
                  textAlignVertical: 'top',
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.inputesInRow}>
            <View style={[styles.infoSectionCells, {flex: 1}]}>
              <Text style={styles.heading}>Pin Code</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={''}
                  // onChangeText={}
                  keyboardType="number-pad"
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '100%',
                  }}
                />
              </View>
            </View>

            <View style={[styles.infoSectionCells, {flex: 1}]}>
              <Text style={styles.heading}>Country</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={''}
                  // onChangeText={}
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.inputesInRow}>
            <View style={[styles.infoSectionCells, {flex: 1}]}>
              <Text style={styles.heading}>State</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={''}
                  // onChangeText={}
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '100%',
                  }}
                />
              </View>
            </View>

            <View style={[styles.infoSectionCells, {flex: 1}]}>
              <Text style={styles.heading}>City</Text>
              <View style={styles.inputView}>
                <TextInput
                  value={''}
                  // onChangeText={}
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '100%',
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Landline No.</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="number-pad"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Mobile No.</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="number-pad"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Google Map Location</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                placeholder="Search location..."
                placeholderTextColor={'#ADAEBC'}
                // onChangeText={}
                keyboardType="number-pad"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
              <View style={{position: 'absolute', right: 12, top: 15}}>
                <LocationIcon height={20} />
              </View>
            </View>
          </View>

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Business Nature</Text>
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
              placeholder="Select Nature"
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
            <Text style={styles.heading}>Product Categories</Text>
            <FlatList
              data={productCategory}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => toggleProductCateCheckbox(item.id)}
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

          <View style={styles.infoSectionCells}>
            <Text style={styles.heading}>Years in Business</Text>
            <View style={styles.inputView}>
              <TextInput
                value={''}
                // onChangeText={}
                keyboardType="number-pad"
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.infoDetailSection}>
          <Text style={styles.heading}>
            <InfoIcon /> Payment will be processed offline. Our admin team will
            contact you with the exact fee based on your category.
          </Text>
        </View>

        <TouchableOpacity
          style={{marginVertical: 20}}
          onPress={() => {
            navigation.navigate('CatalogueForm');
          }}>
          <LinearGradient
            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 65,
              borderRadius: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Montserrat-SemiBold',
                color: '#000',
              }}>
              Submit Details
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ExhibitorRegister;
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
    marginBottom: 12,
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
  formTitleheading: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginBottom: 10,
  },
  inputView: {
    height: 50,
    width: '100%',
    marginTop: 5,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  radioText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  labelContainer: {
    marginLeft: 8,
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
  inputesInRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
