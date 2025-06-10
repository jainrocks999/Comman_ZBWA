// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ImageBackground, ActivityIndicator, Modal, FlatList, Image, ScrollView, Pressable } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import styles from "./memberdirectorystyle";
// import CustomHeader from "../../../components/CustomHeader";
// import Toast from "react-native-simple-toast";
// import Constants from "../../../Redux/Constants";
// const MemberDirectory = ({ navigation }) => {
//     const [businessName, setBusinessName] = useState("");
//     const [description, setDescription] = useState("");
//     const [jewelryType, setJewelryType] = useState("");
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [jewelryOptions, setJewelryOptions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingProfiles, setLoadingProfiles] = useState(false);
//     const [companyProfiles, setCompanyProfiles] = useState([]);
//     const [selectedJewelryTypes, setSelectedJewelryTypes] = useState([]);

//     useEffect(() => {
//         fetchJewelryTypes();
//     }, []);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             if (businessName !== "" || description !== "" || selectedJewelryTypes.length > 0) {
//                 fetchCompanyProfiles();
//             } else {
//                 setCompanyProfiles([]);
//             }
//         }, 500);
//         return () => clearTimeout(timeout);
//     }, [businessName, description, selectedJewelryTypes]);

//     const fetchJewelryTypes = async () => {
//         const user_token = await AsyncStorage.getItem("user_token");
//         let config = {
//             method: "get",
//             url: `${Constants.MainUrl}member/get/jewellery/types`,
//             headers: { Authorization: `${user_token}` },
//         };
//         setLoading(true);
//         try {
//             const response = await axios(config);
//             if (response.data.code === 200) {
//                 setJewelryOptions(response.data.data.map(type => type.type));
//             } else {
//                 Toast.show("Failed to fetch jewelry types");
//             }
//         } catch (error) {
//             Toast.show("Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchCompanyProfiles = async () => {
//         const user_token = await AsyncStorage.getItem("user_token");
//         const encodedDescription = encodeURIComponent(description.trim());
//         const jewelleryTypeQuery = selectedJewelryTypes
//             .map(type => `jewelleryType=${encodeURIComponent(type.trim())}`)
//             .join("&");
//         let url = `${Constants.MainUrl}member/get/company/profile/list?${jewelleryTypeQuery}&shortDescription=${encodedDescription}&companyName=${encodeURIComponent(businessName.trim())}`;
//         let config = {
//             method: "get",
//             url: url,
//             headers: { Authorization: `${user_token}` },
//         };
//         setLoadingProfiles(true);
//         try {
//             const response = await axios(config);
//             if (response.data.code === 200 && Array.isArray(response.data.data?.data)) {
//                 console.log("Setting companyProfiles:", response.data.data.data);
//                 setCompanyProfiles(response.data.data.data);
//             } else {
//                 console.log("No profiles found!");
//                 setCompanyProfiles([]);
//             }
//         } catch (error) {
//             console.log("API Error:", error?.response?.data || error);
//             Toast.show(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoadingProfiles(false);
//         }
//     };

//     const fetchCompanyDetails = async (companyId) => {
//         console.log('Fetching company details...');
//         const user_token = await AsyncStorage.getItem("user_token");
//         console.log('User Token:', user_token);
//         let url = `${Constants.MainUrl}member/get/company/profile/details/${companyId}`;
//         let config = {
//             method: "get",
//             url: url,
//             headers: { Authorization: `${user_token}` },
//         };
//         setLoadingProfiles(true);
//         try {
//             const response = await axios(config);
//             if (response.data.code === 200 && response.data.data) {
//                 navigation.navigate("CompanyDetailsScreen", { companyData: response.data.data });
//             } else {
//                 Toast.show("No details found");
//             }
//         } catch (error) {
//             console.log("API Error:", error);
//             Toast.show(error.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoadingProfiles(false);
//         }
//     };
//     const filteredOptions = jewelryOptions.filter(option =>
//         option.toLowerCase().includes(jewelryType.trim().toLowerCase())
//     );

//     const toggleSelection = (option) => {
//         setSelectedJewelryTypes((prevSelected) => {
//             if (prevSelected.includes(option)) {
//                 return prevSelected.filter((item) => item !== option);
//             } else {
//                 return [...prevSelected, option];
//             }
//         });
//     };

//     return (
//         <TouchableWithoutFeedback onPress={() => {
//             Keyboard.dismiss();
//             console.log("Closing Dropdown");
//             setDropdownOpen(false);
//         }} accessible={false}>
//             <ImageBackground
//                 source={require("../../../assets/Logo/background.png")}
//                 style={styles.background}
//             >
//                 <CustomHeader
//                     title="Member Directory & Catalogue"
//                     onPress={() => navigation.goBack()}
//                     onPress2={() => navigation.navigate("Notification")}
//                 />
//                 <View style={styles.container}>
//                     <View style={styles.inputGroup}>
//                         <Text style={styles.label}>Business Name</Text>
//                         <TextInput
//                             style={[styles.input, { color: "#000" }]}
//                             placeholder="Enter Business Name..."
//                             placeholderTextColor="#888"
//                             value={businessName}
//                             onChangeText={setBusinessName}
//                             onFocus={() => setDropdownOpen(false)}
//                         />
//                     </View>
//                     <View style={styles.inputGroup}>
//                         <Text style={styles.label}>Short Description</Text>
//                         <TextInput
//                             style={[styles.input, styles.textArea, { color: "#000" }]}
//                             placeholder="Enter Short Description..."
//                             placeholderTextColor="#888"
//                             value={description}
//                             onChangeText={setDescription}
//                             multiline
//                             onFocus={() => setDropdownOpen(false)}
//                         />
//                     </View>
//                     <View style={styles.inputGroup}>
//                         <Text style={styles.label}>Jewellery Type</Text>

//                         <TouchableOpacity
//                             style={styles.dropdown}
//                             onPress={() => {
//                                 Keyboard.dismiss();
//                                 console.log("Dropdown Open State Before:", dropdownOpen);
//                                 setDropdownOpen(!dropdownOpen);
//                                 console.log("Dropdown Open State After:", !dropdownOpen);
//                             }}>
//                             <Text style={[styles.dropdownText, { color: selectedJewelryTypes.length > 0 ? "#000" : "#888" }]}>
//                                 {selectedJewelryTypes.length > 0 ? selectedJewelryTypes.join(", ") : "Select Jewellery Type..."}
//                             </Text>
//                         </TouchableOpacity>
//                         {dropdownOpen && (
//                             <View style={styles.dropdownContainer}>
//                                 {loading ? (
//                                     <ActivityIndicator size="small" color="#FCDA64" />
//                                 ) : (
//                                     <ScrollView
//                                         nestedScrollEnabled={true}
//                                         style={styles.scrollableDropdown}
//                                         keyboardShouldPersistTaps="handled"
//                                     >
//                                         {jewelryOptions.map((option, index) => (
//                                             <Pressable key={index} style={styles.dropdownItem}
//                                                 onPress={() => toggleSelection(option)}>
//                                                 <View style={styles.checkboxContainer}>
//                                                     <View style={selectedJewelryTypes.includes(option) ? styles.checkboxSelected : styles.checkbox}>
//                                                         {selectedJewelryTypes.includes(option) && <View style={styles.innerSquare} />}
//                                                     </View>
//                                                     <Text style={styles.dropdownItemText}>{option}</Text>
//                                                 </View>
//                                             </Pressable>
//                                         ))}
//                                     </ScrollView>
//                                 )}

//                                 <Pressable
//                                     style={styles.doneButton}
//                                     onPress={() => {
//                                         if (selectedJewelryTypes.length > 0 || businessName || description) {
//                                             fetchCompanyProfiles(selectedJewelryTypes);
//                                         } else {
//                                             setCompanyProfiles([]);
//                                         }
//                                         setDropdownOpen(false);
//                                     }}
//                                 >

//                                     <Text style={styles.doneButtonText}>Done</Text>
//                                 </Pressable>
//                             </View>
//                         )}

//                     </View>

//                     {loadingProfiles ? (
//                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
//                             <ActivityIndicator size="large" color="#FCDA64" />
//                         </View>
//                     ) : companyProfiles.length > 0 ? (
//                         <FlatList
//                             data={companyProfiles}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.companyCard} onPress={() => {
//                                     if (item.user_id?._id) {
//                                         fetchCompanyDetails(item.user_id._id);
//                                     } else {
//                                         Toast.show("User ID not available");
//                                     }
//                                 }}>
//                                     <Image source={{ uri: item.company_logo }} style={styles.companyLogo} />
//                                     <View style={styles.companyInfo}>
//                                         <Text style={styles.companyName}>{item.company_name}</Text>
//                                         <Text style={styles.companyDescription}>{item.short_description}</Text>
//                                         <Text style={[styles.companyDescription, { lineHeight: 22 }]}>
//                                             {Array.isArray(item.type_of_jewellery) ? item.type_of_jewellery.join(", ") : item.type_of_jewellery}
//                                         </Text>
//                                         <Text style={styles.companyContact}>{item.contact}</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                     ) : (
//                         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
//                             <Text style={{ color: "#777", fontSize: 16 }}>No Profiles Found</Text>
//                         </View>
//                     )}
//                 </View>
//             </ImageBackground>
//         </TouchableWithoutFeedback>
//     );
// };
// export default MemberDirectory;

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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './memberdirectorystyle';
import CustomHeader from '../../../components/CustomHeader';
import Toast from 'react-native-simple-toast';
import Constants from '../../../Redux/Constants';
import SearchIcon from '../../../assets/Icon/search5.svg';
import LinearGradient from 'react-native-linear-gradient';

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

  return (
    <Pressable
      style={{ flex: 1 , }}          // पूरा area कवर करे
      onPress={() => {
        Keyboard.dismiss();
        setDropdownOpen(false);
      }}>
      {/* // <TouchableWithoutFeedback
    //   onPress={() => {
    //     Keyboard.dismiss();
    //     setDropdownOpen(false);
    //   }}
    //   accessible={false}
    //   > */}

<View style={[styles.background, { backgroundColor: isSearchMode ? '#F9F4F1' : '#FFFFFF' }]}>
        {/* <CustomHeader
          title="Member Directory & Catalogue"
          onPress={() => navigation.goBack()}
        /> */}
        <CustomHeader
          title={isSearchMode ? 'Search' : 'Member Directory & Catalogue'}
          onPress={() => navigation.goBack()}
        />

        {/* Search Icon Button just below header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: 10,
            // paddingVertical: 8,
            marginTop: 10,
            marginBottom: -10,
          }}>
          <TouchableOpacity
            onPress={() => setIsSearchMode(prev => !prev)}
            style={{
              padding: 6,
              backgroundColor: '#F9F4F1',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderWidth: 2,
              borderColor: '#FFD387'
            }} >

            <SearchIcon width={25} />

          </TouchableOpacity>
        </View>

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
                        style={styles.doneButton}
                        onPress={() => {
                          fetchCompanyProfiles();
                          setDropdownOpen(false);
                        }}>
                        <Text style={styles.doneButtonText}>Done</Text>
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
                  : allProfiles
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
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Pressable>
  );
};

export default MemberDirectory;
