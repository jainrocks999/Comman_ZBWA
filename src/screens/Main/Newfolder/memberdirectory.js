import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Pressable,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './memberdirectorystyle';
import CustomHeader from '../../../components/CustomHeader';
import Toast from 'react-native-simple-toast';
import Constants from '../../../Redux/Constants';
import SearchIcon from '../../../assets/Icon/Vector.svg';
import Filter from '../../../assets/Icon/filter.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import DropdownIcon from '../../../assets/Icon/Vectors.svg'
const MemberDirectory = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jewelryOptions, setJewelryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [companyProfiles, setCompanyProfiles] = useState([]);
  const [selectedJewelryTypes, setSelectedJewelryTypes] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [allProfiles, setAllProfiles] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
const [noResultFound, setNoResultFound] = useState(false);
 
useEffect(() => {
  if (!isSearchMode) {
    setLoadingProfiles(true); 
    setNoResultFound(false); 

    const timeout = setTimeout(() => {
      const lower = searchName.trim().toLowerCase();

      if (lower === '') {
        setFilteredProfiles(allProfiles);
        setNoResultFound(false); 
      } else {
        const filtered = allProfiles.filter(profile =>
          profile.company_name?.toLowerCase().includes(lower) 
          // profile.short_description?.toLowerCase().includes(lower)
        );

        setFilteredProfiles(filtered);
        setNoResultFound(filtered.length === 0); // agar kuch bhi na mila
      }

      setLoadingProfiles(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
      setLoadingProfiles(false);
    };
  }
}, [searchName, allProfiles, isSearchMode]);

  useEffect(() => {
    fetchJewelryTypes();
    fetchAllCompanyProfiles();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        isSearchMode &&
        (businessName !== '' ||
          description !== '' ||
          selectedJewelryTypes.length > 0)
      ) {
        fetchCompanyProfiles();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [businessName, description, selectedJewelryTypes]);

  const fetchJewelryTypes = async () => {
    const user_token = await AsyncStorage.getItem('user_token');
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}member/get/jewellery/types`,
      headers: { Authorization: `${user_token}` },
    };
    setLoading(true);
    try {
      const response = await axios(config);
      if (response.data.code === 200) {
        setJewelryOptions(response.data.data.map(type => type.type));
      } else {
        Toast.show('Failed to fetch jewelry types');
      }
    } catch (error) {
      Toast.show('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCompanyProfiles = async () => {
    const user_token = await AsyncStorage.getItem('user_token');
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}member/get/company/profile/list`,
      headers: { Authorization: `${user_token}` },
    };
    setLoadingProfiles(true);
    try {
      const response = await axios(config);
      if (
        response.data.code === 200 &&
        Array.isArray(response.data.data?.data)
      ) {
        setAllProfiles(response.data.data.data);
      } else {
        setAllProfiles([]);
      }
    } catch (error) {
      Toast.show('Something went wrong');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchCompanyProfiles = async () => {
    const user_token = await AsyncStorage.getItem('user_token');
    const encodedDescription = encodeURIComponent(description.trim());
    const jewelleryTypeQuery = selectedJewelryTypes
      .map(type => `jewelleryType=${encodeURIComponent(type.trim())}`)
      .join('&');

    let url = `${Constants.MainUrl}member/get/company/profile/list?${jewelleryTypeQuery}&shortDescription=${encodedDescription}`;

    let config = {
      method: 'get',
      url: url,
      headers: { Authorization: `${user_token}` },
    };

    setLoadingProfiles(true);

    try {
      const response = await axios(config);

      if (
        response.data.code === 200 &&
        Array.isArray(response.data.data?.data)
      ) {
        let profiles = response.data.data.data;

        // Frontend filtering for businessName and description (case-insensitive)
        if (businessName.trim() !== '') {
          const bnLower = businessName.trim().toLowerCase();
          profiles = profiles.filter(profile =>
            // profile.company_name.toLowerCase().startsWith(bnLower),
            profile.company_name.toLowerCase().includes(bnLower),
          );
        }

        if (description.trim() !== '') {
          const descLower = description.trim().toLowerCase();
          profiles = profiles.filter(
            profile =>
              profile.short_description &&
              // profile.short_description.toLowerCase().startsWith(descLower),
              profile.short_description.toLowerCase().includes(descLower),
          );
        }

        setCompanyProfiles(profiles);
      } else {
        setCompanyProfiles([]);
      }
    } catch (error) {
      console.log('API Error:', error?.response?.data || error);
      Toast.show(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchCompanyDetails = async companyId => {
    const user_token = await AsyncStorage.getItem('user_token');
    let url = `${Constants.MainUrl}member/get/company/profile/details/${companyId}`;
    let config = {
      method: 'get',
      url: url,
      headers: { Authorization: `${user_token}` },
    };
    setLoadingProfiles(true);
    try {
      const response = await axios(config);
      if (response.data.code === 200 && response.data.data) {
        navigation.navigate('CompanyDetailsScreen', {
          companyData: response.data.data,
        });
      } else {
        Toast.show('No details found');
      }
    } catch (error) {
      Toast.show(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const toggleSelection = option => {
    setSelectedJewelryTypes(prevSelected =>
      prevSelected.includes(option)
        ? prevSelected.filter(item => item !== option)
        : [...prevSelected, option],
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSearchMode) {
          setIsSearchMode(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isSearchMode])
  );
  return (
    <Pressable
      style={{ flex: 1, }}
      onPress={() => {
        Keyboard.dismiss();
        setDropdownOpen(false);
      }}>
      <View style={[styles.background, { backgroundColor: isSearchMode ? '#F9F4F1' : '#FFFFFF' }]}>
        <CustomHeader
          title={''}
          onPress={() => {
            if (isSearchMode) {
              setIsSearchMode(false);
            } else {
              navigation.goBack();
            }
          }}
          onPress2={() => navigation.navigate('Notification')}
        />
        <ScrollView style={{ flexGrow: 1, paddingHorizontal: 0 }}>
          <Text style={styles.HeadingText}>Member Directory & Catalogue</Text>
          {!isSearchMode && (
            <TouchableOpacity
              style={[styles.infoDetailSection, { paddingVertical: 15 }]}>
              <View style={[styles.inputView, { flexDirection: 'row', alignItems: "center", gap: 5, paddingHorizontal: 10 }]}>
                <SearchIcon height={20} />
                <TextInput
                  value={searchName}
                  onChangeText={text => setSearchName(text)}
                  placeholder="Search..."
                  placeholderTextColor={'#ADAEBC'}
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '80%',
                  }}
                />
                <TouchableOpacity
                  onPress={() => setIsSearchMode(prev => !prev)}
                >
                  <Filter height={25} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

          )}

          <View style={styles.container}>
            {isSearchMode && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Business Name</Text>
                  <TextInput
                    style={[styles.input, { color: '#000' }]}
                    placeholder="Enter Business Name..."
                    placeholderTextColor="#888"
                    value={businessName}
                    onChangeText={setBusinessName}
                    onFocus={() => setDropdownOpen(false)}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Short Description</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.textArea,
                      { color: '#000', textAlignVertical: 'top' },
                    ]}
                    placeholder="Enter Short Description..."
                    placeholderTextColor="#888"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    onFocus={() => setDropdownOpen(false)}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Jewellery Type</Text>
                  <TouchableOpacity
                    style={styles.dropdown}
                    // onPress={() => setDropdownOpen(!dropdownOpen)}>
                    onPress={() => {
                      Keyboard.dismiss();
                      setDropdownOpen(!dropdownOpen);
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text
                        style={[
                          styles.dropdownText,
                          {
                            color:
                              selectedJewelryTypes.length > 0 ? '#000' : '#888',
                          },
                        ]}>
                        {selectedJewelryTypes.length > 0
                          ? selectedJewelryTypes.join(', ')
                          : 'Select Jewellery Type...'}
                      </Text>
                      <DropdownIcon height={14} width={14} />
                    </View>
                  </TouchableOpacity>
                  {dropdownOpen && (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        Keyboard.dismiss();
                        setDropdownOpen(false);
                      }}>

                      <View style={styles.dropdownContainer}>
                        {loading ? (
                          <ActivityIndicator size="small" color="#FCDA64" />
                        ) : (
                          <ScrollView
                            nestedScrollEnabled
                            style={styles.scrollableDropdown}
                            keyboardShouldPersistTaps="handled">
                            {jewelryOptions.map((option, index) => (
                              <Pressable
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => toggleSelection(option)}>
                                <View style={styles.checkboxContainer}>
                                  <View
                                    style={
                                      selectedJewelryTypes.includes(option)
                                        ? styles.checkboxSelected
                                        : styles.checkbox
                                    }>
                                    {selectedJewelryTypes.includes(option) && (
                                      <View style={styles.innerSquare} />
                                    )}
                                  </View>
                                  <Text style={styles.dropdownItemText}>
                                    {option}
                                  </Text>
                                </View>
                              </Pressable>
                            ))}
                          </ScrollView>
                        )}
                        <Pressable

                          onPress={() => {
                            fetchCompanyProfiles();
                            setDropdownOpen(false);
                          }}>
                          <LinearGradient
                            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.doneButton}>
                            <Text style={styles.doneButtonText}>Done</Text>
                          </LinearGradient>
                        </Pressable>
                      </View>

                    </TouchableWithoutFeedback>
                  )}

                </View>
              </>
            )}

            {loadingProfiles ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <ActivityIndicator size="large" color="#FCDA64" />
              </View>
            ) : (
              <FlatList
                data={
                  isSearchMode
                    ? businessName !== '' ||
                      description !== '' ||
                      selectedJewelryTypes.length > 0
                      ? companyProfiles
                      : []
                    : filteredProfiles
                }
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Text style={{ color: '#777' }}>
                      {isSearchMode ? 'No Results Found' : 'No Profiles Found'}
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.companyCard}
                    onPress={() => {
                      if (item.user_id?._id) {
                        fetchCompanyDetails(item.user_id._id);
                      } else {
                        Toast.show('User ID not available');
                      }
                    }}>
                    <Image
                      source={{ uri: item.company_logo }}
                      style={styles.companyLogo}
                    />
                    <View style={styles.companyInfo}>
                      {/* <Text style={styles.companyName}>{item.company_name}</Text>
                    <Text style={styles.companyDescription}>
                      {item.short_description}
                    </Text>
                    <Text style={[styles.companyDescription, {lineHeight: 22}]}>
                      {Array.isArray(item.type_of_jewellery)
                        ? item.type_of_jewellery.join(', ')
                        : item.type_of_jewellery}
                    </Text> */}
                      <Text style={styles.companyName}>
                        {item.company_name?.length > 20
                          ? item.company_name.substring(0, 20) + '...'
                          : item.company_name}
                      </Text>

                      <Text style={styles.companyDescription}>
                        {item.short_description?.length > 20
                          ? item.short_description.substring(0, 20) + '...'
                          : item.short_description}
                      </Text>

                      <Text style={[styles.companyDescription, { lineHeight: 22 }]}>
                        {(Array.isArray(item.type_of_jewellery)
                          ? item.type_of_jewellery.join(', ')
                          : item.type_of_jewellery
                        )?.length > 20
                          ? (Array.isArray(item.type_of_jewellery)
                            ? item.type_of_jewellery.join(', ')
                            : item.type_of_jewellery
                          ).substring(0, 20) + '...'
                          : Array.isArray(item.type_of_jewellery)
                            ? item.type_of_jewellery.join(', ')
                            : item.type_of_jewellery}
                      </Text>

                      <Text style={styles.companyContact}>{item.contact}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </ScrollView>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Pressable>
  );
};

export default MemberDirectory;
