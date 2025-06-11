// import React, {useState, useEffect} from 'react';
// import styles from './firststyle';
// import {FlatList, PermissionsAndroid, Pressable} from 'react-native';
// import axios, {formToJSON} from 'axios';
// import Constants from '../../../Redux/Constants';
// import Storage from '../../../components/LocalStorage';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   ImageBackground,
//   Image,
//   Modal,
// } from 'react-native';
// import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import CustomHeader from '../../../components/CustomHeader';
// import {useNavigation} from '@react-navigation/native';
// import Loading from '../../../components/Loader';
// import {RESULTS} from 'react-native-permissions';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// const MemberDirectorys = ({route}) => {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [googleAddressLink, setGoogleAddressLink] = useState('');
//   const [phone, setPhone] = useState('');
//   const [whatsAppNo, setWhatsAppNo] = useState('');
//   const [directorName, setDirectorName] = useState([]);
//   const [categoryDetail, setCategoryDetail] = useState('');
//   const [directorPhoto, setDirectorPhoto] = useState([]);
//   const [categoryImages, setCategoryImages] = useState([]);
//   const [logoImage, setLogoImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
//   const [imageType, setImageType] = useState('');
//   const [loader, setLoader] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [jewelryOptions, setJewelryOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [categoryName, setCategoryImagesname] = useState('');
//   const [initialDataLoaded, setInitialDataLoaded] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImageUri, setSelectedImageUri] = useState(null);

//   useEffect(() => {
//     fetchJewelryTypes();
//   }, []);

//   useEffect(() => {
//     if (initialDataLoaded) {
//       setDirectorName(prev => {
//         if (!Array.isArray(prev)) return [];
//         return prev.filter(name => jewelryOptions.includes(name));
//       });
//     }
//   }, [jewelryOptions]);

//   const fetchJewelryTypes = async () => {
//     try {
//       setLoading(true);
//       const user_token = await AsyncStorage.getItem('user_token');
//       if (!user_token) {
//         Toast.show('User token not found');
//         return;
//       }
//       const response = await axios.get(
//         `${Constants.MainUrl}member/get/jewellery/types`,
//         {
//           headers: {Authorization: `${user_token}`},
//         },
//       );
//       if (response.data?.code === 200) {
//         const types = response.data.data || [];
//         const newOptions = types.map(type => type.type);
//         setJewelryOptions(newOptions);
//         setInitialDataLoaded(true);
//       } else {
//         Toast.show(response.data?.message || 'Failed to fetch jewelry types');
//       }
//     } catch (error) {
//       Toast.show(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = option => {
//     if (true) {
//       setDirectorName(prev => {
//         if (Array.isArray(prev)) {
//           return prev.includes(option)
//             ? prev.filter(item => item !== option)
//             : [...prev, option];
//         }
//         return [option];
//       });
//     }
//   };

//   useEffect(() => {
//     if (route.params) {
//       setName(route.params.name || '');
//       setAddress(route.params.address || '');
//       setPhone(route.params.phone || '');
//       setCategoryDetail(route.params.directorName.join('') || '');
//       setWhatsAppNo(route?.params?.whatsAppNo || '');
//       setGoogleAddressLink(route?.params?.googleAddressLink || '');
//       let directorNameData = route.params.categoryDetail;
//       setDirectorName(Array.isArray(directorNameData) ? directorNameData : []);
//       setLogoImage(
//         route.params.logoImage
//           ? {uri: route.params.logoImage}
//           : {uri: 'https://via.placeholder.com/120'},
//       );
//       setDirectorPhoto(
//         Array.isArray(route.params.directorPhoto)
//           ? route.params.directorPhoto.map(url => ({uri: url}))
//           : [],
//       );

//       setCategoryImages(
//         Array.isArray(route.params.categoryImages)
//           ? route.params.categoryImages.map(item => ({
//               uri: item?.uri?.image
//                 ? {image: item.uri.image}
//                 : {image: item.image},
//               name: item.name || '',
//             }))
//           : [],
//       );
//     }
//   }, [route.params]);

//   const handlePersonalDetails = async () => {
//     try {
//       setLoader(true);
//       const user_token = await AsyncStorage.getItem('user_token');
//       if (!user_token) {
//         Toast.show('Session expired. Please log in again.');
//         navigation.navigate('Login');
//         return;
//       }
//       if (!validateInputs()) return;
//       const formData = prepareFormData();
//       console.log(JSON.stringify(formData), 'formdat....................');
//       const finalToken = user_token.startsWith('Bearer ')
//         ? user_token
//         : `Bearer ${user_token}`;
//       if (route.params?.editMode) {
//         await handleUpdateCompanyProfile();
//         return;
//       }
//       const response = await axios.post(
//         `${Constants.MainUrl}member/add/company/profile`,
//         formData,
//         {
//           headers: {
//             Authorization: finalToken,
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );

//       if (response.data.code === 200) {
//         Toast.show('Details saved successfully!');
//         navigation.navigate('MemberDirectoryTemplate');
//       } else {
//         Toast.show(response.data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setLoader(false);
//     }
//   };
//   const getFileDetails = uri => {
//     return {
//       uri,
//       name: uri?.split('/').pop(),
//       type: 'image/jpeg',
//     };
//   };

//   const handleUpdateCompanyProfile = async () => {
//     try {
//       setLoader(true);
//       console.log('Updating Company Profile...');
//       const user_token = await AsyncStorage.getItem('user_token');
//       const user_id = await AsyncStorage.getItem('user_id');
//       if (!user_token) {
//         console.error('User token is missing or expired.');
//         Toast.show('Session expired. Please log in again.');
//         navigation.navigate('Login');
//         return;
//       }
//       // console.log("User token exists:", user_token);
//       if (!validateInputs()) return;
//       const formData = new FormData();
//       console.log(formData, 'handleUpdateCompanyProfile..............');
//       formData.append('company_name', name);
//       formData.append('contact', phone);
//       formData.append('short_description', categoryDetail);
//       formData.append('whatsapp_number', whatsAppNo);
//       formData.append('google_map_link', googleAddressLink);
//       directorName.forEach(item => {
//         formData.append('type_of_jewellery', item);
//       });
//       formData.append('address', address);
//       if (logoImage?.uri) {
//         const logoDetails = getFileDetails(logoImage.uri);
//         formData.append('company_logo', logoDetails);
//       }
//       directorPhoto.forEach((photo, index) => {
//         if (photo?.uri) {
//           const photoDetails = getFileDetails(photo.uri);
//           formData.append(`slider_images`, photoDetails);
//         }
//       });

//       categoryImages.forEach((image, index) => {
//         if (image?.uri?.image) {
//           const imageDetails = getFileDetails(image.uri.image);
//           formData.append(`collection_photos`, imageDetails);

//           const labelName = image.name || 'Collection Image';
//           // Only label name without extension
//           formData.append('collection_photo_title', labelName);
//         }
//       });

//       const response = await axios.post(
//         `${Constants.MainUrl}member/update/company/details`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: user_token,
//           },
//         },
//       );
//       if (response.data.code === 200) {
//         Toast.show('Profile updated successfully!');

//         navigation.navigate('MemberDirectoryTemplate');
//       } else {
//         Toast.show(
//           response.data.message || 'Something went wrong during update',
//         );
//       }
//     } catch (error) {
//       console.error('API Request Failed:', error);

//       if (error.message.includes('Network Error')) {
//         Toast.show('Network error! Please check your internet connection.');
//       } else {
//         Toast.show(error.response?.data?.message || 'Something went wrong');
//       }
//     } finally {
//       setLoader(false);
//     }
//   };

//   const handleApiError = error => {
//     console.error(' API Request Failed:', error?.response?.data || error);
//     if (error.response) {
//       console.error(
//         ' Error Response Data:',
//         JSON.stringify(error.response.data, null, 2),
//       );
//     }
//     Toast.show(error.response?.data?.message || 'Something went wrong');
//   };

//   const validateInputs = () => {
//     if (!name.trim()) {
//       Toast.show('Please enter company name');
//       return false;
//     }
//     if (!categoryDetail.trim()) {
//       Toast.show('Please enter short description');
//       return false;
//     }
//     if (directorName.length === 0) {
//       Toast.show('Please select at least one category detail');
//       return false;
//     }
//     if (phone.length !== 10 || isNaN(phone)) {
//       Toast.show('Please enter a valid phone number');
//       return false;
//     }
//     if (!address.trim()) {
//       Toast.show('Please enter your address');
//       return false;
//     }
//     if (!logoImage?.uri) {
//       console.error('Please upload logo image:', logoImage);
//       Toast.show('Please upload logo image');
//       return false;
//     }
//     if (directorPhoto.length < 1) {
//       Toast.show('Please upload at least 1 slider image');
//       return false;
//     }
//     if (categoryImages.length < 1) {
//       Toast.show('Please upload at least 1 product image');
//       return false;
//     }
//     for (let image of categoryImages) {
//       if (!image.name || image.name.trim() === '') {
//         Toast.show('Please add a label for each uploaded image.');
//         return false;
//       }
//     }
//     return true;
//   };

//   const prepareFormData = () => {
//     const formData = new FormData();
//     formData.append('company_name', name);
//     formData.append('contact', phone);
//     formData.append('short_description', categoryDetail);
//     formData.append('whatsapp_number', whatsAppNo);
//     formData.append('google_map_link', googleAddressLink);
//     directorName.forEach(item => {
//       formData.append('type_of_jewellery', item);
//     });
//     formData.append('address', address);
//     formData.append('company_logo', {
//       uri: logoImage.uri,
//       name: logoImage.name,
//       type: logoImage.type,
//     });
//     directorPhoto.forEach(photo => {
//       formData.append('slider_images', {
//         uri: photo.uri,
//         type: photo.type || 'image/jpeg',
//         name: photo.name || `slider.jpg`,
//       });
//     });

//     categoryImages.forEach((image, index) => {
//       if (image?.uri?.image) {
//         const imageDetails = getFileDetails(image.uri.image);
//         formData.append(`collection_photos`, imageDetails);
//         const labelName = image.name || 'Collection Image';
//         console.log(labelName, 'labelName');
//         const cleanedLabel =
//           labelName.split('.').slice(0, -1).join('.') || labelName;
//         console.log(` Sending label:`, cleanedLabel);
//         formData.append('collection_photo_title', cleanedLabel);
//       }
//     });
//     // console.log(formData, 'prepareFormData');
//     return formData;
//   };

//   useEffect(() => {
//     if (route.params?.editMode) {
//     } else {
//       apiCall();
//     }
//   }, []);

//   const apiCall = async () => {
//     setIsLoading(true);
//     const user_token = await AsyncStorage.getItem(Storage.user_token);
//     const user_id = await AsyncStorage.getItem(Storage.user_id);
//     let config = {
//       method: 'get',
//       url: `${Constants.MainUrl}member/get/member/details`,
//       headers: {
//         Authorization: `${user_token}`,
//       },
//     };

//     try {
//       const response = await axios(config);
//       if (response.data.code === 200) {
//         setIsLoading(true);
//         const data = response.data.data;
//         if (data.businessDetails) {
//           setName(data.businessDetails.businessName || '');
//           setAddress(data.businessDetails.address || '');
//           setPhone(data.businessDetails.phone || '');
//         } else {
//           setIsLoading(true);
//         }
//       } else {
//         setIsLoading(true);
//         Toast.show(response.data.message || 'Failed to fetch data');
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log('Error Response:', error.response.data);
//       }
//       Toast.show(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs access to your camera for capturing photos.',
//             buttonPositive: 'OK',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else {
//       // iOS camera permission
//       const result = await request(PERMISSIONS.IOS.CAMERA);
//       return result === RESULTS.GRANTED;
//     }
//   };

//   const handlePhotoUpload = source => {
//     const options = {
//       mediaType: 'photo',
//       cameraType: 'back',
//       maxWidth: 300,
//       maxHeight: 300,
//       quality: 0.8,
//       saveToPhotos: true,
//       selectionLimit: source === 'gallery' ? 0 : 1,
//     };
//     // const requestCameraPermission = async () => {
//     //     if (Platform.OS === "android") {
//     //         try {
//     //             const granted = await PermissionsAndroid.request(
//     //                 PermissionsAndroid.PERMISSIONS.CAMERA,
//     //                 {
//     //                     title: "Camera Permission",
//     //                     message: "App needs access to your camera for capturing photos.",
//     //                     buttonPositive: "OK",
//     //                 }
//     //             );
//     //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     //                 return true;
//     //             } else {
//     //                 Toast.show("Camera permission denied");
//     //                 return false;
//     //             }
//     //         } catch (err) {
//     //             console.warn(err);
//     //             return false;
//     //         }
//     //     } else {
//     //         return true;
//     //     }
//     // };

//     // const handlePhotoUpload = (source) => {
//     //     const options = {
//     //         mediaType: "photo",
//     //         maxWidth: 300,
//     //         maxHeight: 300,
//     //         quality: 10,
//     //         selectionLimit: source === "gallery" ? 0 : 1,
//     //     };

//     const handleImageResponse = response => {
//       if (response.didCancel) {
//         Toast.show('Image selection cancelled');
//         return;
//       }
//       if (response.errorCode) {
//         Toast.show(`Error: ${response.errorCode}`);
//         return;
//       }

//       const selectedImages2 = response.assets.map(asset => ({
//         uri: asset.uri,
//         type: asset.type,
//         name: asset.fileName,
//       }));
//       if (response.assets && response.assets.length > 0) {
//         const selectedImages = response.assets.map(asset => ({
//           uri: {image: asset.uri},
//           name: '',
//         }));
//         if (imageType === 'logo') {
//           setLogoImage(selectedImages2[0]);
//         } else if (imageType === 'director') {
//           if (directorPhoto.length + selectedImages2.length <= 5) {
//             setDirectorPhoto([...directorPhoto, ...selectedImages2]);
//           } else {
//             Toast.show('You can only upload up to 5 director images');
//           }
//         } else if (imageType === 'category') {
//           if (categoryImages.length + selectedImages.length <= 15) {
//             setCategoryImages([...categoryImages, ...selectedImages]);
//           } else {
//             Toast.show('You can only upload up to 15 category images');
//           }
//         }
//       }
//     };

//     if (source === 'camera') {
//       requestCameraPermission().then(granted => {
//         if (granted) {
//           launchCamera(options, handleImageResponse);
//         }
//       });
//     } else if (source === 'gallery') {
//       launchImageLibrary(options, handleImageResponse);
//     }
//   };

//   const handleDeleteImage = (type, index) => {
//     if (type === 'director') {
//       const updatedPhotos = directorPhoto.filter((_, i) => i !== index);
//       setDirectorPhoto(updatedPhotos);
//     } else if (type === 'category') {
//       const updatedPhotos = categoryImages.filter((_, i) => i !== index);
//       setCategoryImages(updatedPhotos);
//     } else if (type === 'logo') {
//       setLogoImage(null);
//     }
//   };

//   const handleImagePreview = uri => {
//     setSelectedImage(uri);
//     setIsModalVisible(true);
//   };

//   const getImageUri = item => {
//     try {
//       if (!item || !item.uri) return null;

//       if (typeof item.uri === 'string') {
//         return item.uri;
//       }

//       if (item.uri && typeof item.uri.image === 'string') {
//         return item.uri.image;
//       }

//       if (item.uri && typeof item.uri.uri === 'string') {
//         return item.uri.uri;
//       }
//     } catch (error) {
//       console.warn('Error resolving image URI:', error);
//     }

//     return null;
//   };

//   return (
//     <ImageBackground
//       source={require('../../../assets/Logo/background.png')}
//       style={styles.container}>
//       <CustomHeader
//         title={'Our Company Profile'}
//         onPress={() => navigation.goBack()}
//         onPress2={() => navigation.navigate('Notification')}
//       />
//       {loader || loader ? <Loading /> : null}
//       <KeyboardAwareScrollView
//         enableOnAndroid={true}
//         enableAutomaticScroll={true}
//         keyboardShouldPersistTaps="handled"
//         extraScrollHeight={40}
//         keyboardOpeningTime={10}>
//         <ScrollView nestedScrollEnabled={true} style={{flex: 1}}>
//           <View style={styles.main}>
//             <Text style={styles.heading}>
//               Company Name <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <TextInput
//               value={name}
//               onChangeText={setName}
//               style={[styles.input, {fontSize: 12}]}
//               placeholder="Enter company name"
//               onFocus={() => setDropdownOpen(false)}
//             />
//             <Text style={styles.heading}>
//               Short Description <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <TextInput
//               value={categoryDetail}
//               onChangeText={text => setCategoryDetail(text)}
//               placeholder="Enter short description"
//               style={[styles.input, {fontSize: 12}]}
//               onFocus={() => setDropdownOpen(false)}
//             />

//             <Text style={styles.heading}>
//               Category Details <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <Pressable
//               style={[styles.input, styles.dropdown]}
//               onPress={() => setDropdownOpen(!dropdownOpen)}>
//               <Text
//                 style={
//                   directorName.length > 0
//                     ? styles.dropdownTextSelected
//                     : styles.dropdownText
//                 }>
//                 {directorName.length > 0
//                   ? directorName.join(', ')
//                   : 'Select Category Details'}
//               </Text>
//             </Pressable>
//             {dropdownOpen && (
//               <View style={[styles.dropdownList, {maxHeight: 150}]}>
//                 {jewelryOptions.length > 0 ? (
//                   <FlatList
//                     data={jewelryOptions}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({item}) => (
//                       <Pressable
//                         style={styles.dropdownItem}
//                         onPress={() => handleSelect(item)}>
//                         {console.log('this is dircetor name', directorName)}
//                         <View style={styles.checkbox}>
//                           {directorName.includes(item.toString()) && (
//                             <View style={styles.checked} />
//                           )}
//                         </View>
//                         <Text style={styles.dropdownItemText}>{item}</Text>
//                       </Pressable>
//                     )}
//                     nestedScrollEnabled={true}
//                     keyboardShouldPersistTaps="handled"
//                     style={{maxHeight: 180}}
//                   />
//                 ) : (
//                   <Text style={{textAlign: 'center', padding: 10}}>
//                     No categories available
//                   </Text>
//                 )}
//                 <TouchableOpacity
//                   onPress={() => setDropdownOpen(false)}
//                   style={styles.optionButton}>
//                   <Text style={styles.optionText}>Done</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             <Text style={styles.heading}>
//               Phone Number <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <TextInput
//               value={phone}
//               onChangeText={setPhone}
//               style={[styles.input, {fontSize: 12}]}
//               keyboardType="number-pad"
//               placeholder="Enter phone number"
//               maxLength={10}
//               onFocus={() => setDropdownOpen(false)}
//             />
//             <Text style={styles.heading}>WhatsApp Number</Text>
//             <TextInput
//               value={whatsAppNo}
//               onChangeText={text => {
//                 const filteredText = text.replace(/[^0-9]/g, '');
//                 setWhatsAppNo(filteredText);
//               }}
//               style={[styles.input, {fontSize: 12}]}
//               keyboardType="number-pad"
//               placeholder="Enter WhatsApp phone number"
//               maxLength={10}
//               onFocus={() => setDropdownOpen(false)}
//             />
//             <Text style={styles.heading}>
//               Address <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <TextInput
//               value={address}
//               onChangeText={setAddress}
//               style={[styles.input, {fontSize: 12}]}
//               placeholder="Enter address"
//               placeholderTextColor="#888"
//               multiline={true}
//               onFocus={() => setDropdownOpen(false)}
//             />
//             <Text style={styles.heading}>Google Maps</Text>
//             <TextInput
//               value={googleAddressLink}
//               onChangeText={setGoogleAddressLink}
//               style={[styles.input, {fontSize: 12}]}
//               placeholder="google Address"
//               placeholderTextColor="#888"
//               multiline={true}
//               onFocus={() => setDropdownOpen(false)}
//             />

//             <Text style={styles.heading}>
//               Logo <Text style={{color: 'red'}}>*</Text>
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setImageType('logo');
//                 setIsOptionModalVisible(true);
//               }}
//               style={styles.uploadButton}>
//               <Text style={styles.uploadText}>Upload Logo</Text>
//             </TouchableOpacity>

//             {logoImage?.uri ? (
//               <View style={styles.imageWrapper1}>
//                 <View>
//                   <TouchableOpacity
//                     onPress={() => handleImagePreview(logoImage.uri)}
//                     style={styles.photoTouch}>
//                     <Image source={{uri: logoImage.uri}} style={styles.photo} />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => handleDeleteImage('logo')}
//                     style={styles.deleteButton2}>
//                     <Text style={styles.deleteText}>X</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ) : null}

//             <View style={{flexDirection: 'row'}}>
//               <Text style={styles.heading}>
//                 Slider Images <Text style={{color: 'red'}}>*</Text>
//               </Text>
//               <View style={styles.rowContainer}>
//                 <Text style={styles.imageSizeText}>(Max size: 300x300px)</Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 setImageType('director');
//                 setIsOptionModalVisible(true);
//               }}
//               style={styles.uploadButton}>
//               <Text style={styles.uploadText}>Upload Images</Text>
//             </TouchableOpacity>
//             <Text
//               style={{
//                 fontSize: 12,
//                 color: '#888',
//                 marginTop: 10,
//                 marginBottom: -50,
//               }}>
//               Maximum 5 images can be uploaded.
//             </Text>

//             <View style={styles.photoContainer}>
//               {directorPhoto.map((item, index) =>
//                 item?.uri ? (
//                   <View key={index} style={styles.imageWrapper}>
//                     <TouchableOpacity
//                       onPress={() => handleImagePreview(item.uri)}
//                       style={styles.photoTouch}>
//                       <Image source={{uri: item.uri}} style={styles.photo} />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => handleDeleteImage('director', index)}
//                       style={styles.deleteButton2}>
//                       <Text style={styles.deleteText}>X</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : null,
//               )}
//             </View>
//             <View style={{flexDirection: 'row', marginTop: 40}}>
//               <Text style={styles.heading}>
//                 Product Images <Text style={{color: 'red'}}>*</Text>
//               </Text>
//               <View style={styles.rowContainer}>
//                 <Text style={styles.imageSizeText}>(Max size: 300x300px)</Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 setImageType('category');
//                 setIsOptionModalVisible(true);
//               }}
//               style={styles.uploadButton}>
//               <Text style={styles.uploadText}>Upload Images</Text>
//             </TouchableOpacity>
//             <Text
//               style={{
//                 fontSize: 12,
//                 color: '#888',
//                 marginTop: 10,
//                 marginBottom: -50,
//               }}>
//               Maximum 15 images can be uploaded.
//             </Text>

//             <View style={styles.photoContainer}>
//               {categoryImages.map((item, index) =>
//                 item?.uri ? (
//                   <View key={index} style={styles.imageWrapper3}>
//                     <TouchableOpacity
//                       onPress={() => handleImagePreview(getImageUri(item))}
//                       style={styles.photoTouch}>
//                       <Image
//                         source={{uri: getImageUri(item)}}
//                         style={styles.photo}
//                       />
//                     </TouchableOpacity>

//                     <View style={{position: 'relative'}}>
//                       {categoryImages[index]?.name === '' && (
//                         <Text
//                           style={{
//                             alignSelf: 'center',
//                             position: 'absolute',
//                             left: 15,
//                             right: 10,
//                             top: 3,
//                             fontSize: 9,
//                             color: '#888',
//                             zIndex: 0,
//                           }}>
//                           Enter label (e.g. Ring)
//                         </Text>
//                       )}
//                       <TextInput
//                         style={[
//                           styles.imageLabelInput,
//                           {fontSize: 14, color: '#000', zIndex: 1},
//                         ]}
//                         value={categoryImages[index]?.name || ''}
//                         onChangeText={text => {
//                           // const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, "");
//                           const filteredText = text.replace(/[^a-zA-Z ]/g, '');

//                           const updatedImages = [...categoryImages];
//                           updatedImages[index].name = filteredText;
//                           setCategoryImages(updatedImages);
//                         }}
//                       />
//                     </View>

//                     <TouchableOpacity
//                       onPress={() => handleDeleteImage('category', index)}
//                       style={styles.deleteButton2}>
//                       <Text style={styles.deleteText}>X</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ) : null,
//               )}
//             </View>

//             <Modal
//               visible={modalVisible}
//               animationType="fade"
//               transparent={true}
//               onRequestClose={() => setModalVisible(false)}>
//               <View style={styles.modalBackground}>
//                 <View style={styles.modalContent}>
//                   <TouchableOpacity
//                     onPress={() => setModalVisible(false)}
//                     style={styles.closeButton}>
//                     <Text style={styles.closeText}>X</Text>
//                   </TouchableOpacity>
//                   <Image
//                     source={{uri: selectedImageUri}}
//                     style={styles.fullScreenImage}
//                   />
//                 </View>
//               </View>
//             </Modal>
//             <TouchableOpacity
//               onPress={handlePersonalDetails}
//               style={styles.touch1}>
//               <Text style={styles.text}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAwareScrollView>
//       {selectedImage && (
//         <Modal
//           visible={isModalVisible}
//           transparent={true}
//           animationType="fade"
//           onRequestClose={() => setIsModalVisible(false)}>
//           <View style={styles.modalContainer}>
//             <Image source={{uri: selectedImage}} style={styles.modalImage} />

//             <TouchableOpacity
//               onPress={() => setIsModalVisible(false)}
//               style={styles.deleteButton1}>
//               <Text style={styles.deleteText1}>X</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       )}

//       <Modal
//         visible={isOptionModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setIsOptionModalVisible(false)}>
//         <View style={styles.optionModal}>
//           <View style={styles.optionContainer}>
//             <Text style={styles.modalHeading}>Choose an Option</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setTimeout(() => {
//                   handlePhotoUpload('camera');
//                 }, 500);
//                 setIsOptionModalVisible(false);
//               }}
//               style={styles.optionButton}>
//               <Text style={styles.optionText}>Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setTimeout(() => {
//                   handlePhotoUpload('gallery');
//                 }, 500);
//                 setIsOptionModalVisible(false);
//               }}
//               style={styles.optionButton}>
//               <Text style={styles.optionText}>Gallery</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => setIsOptionModalVisible(false)}
//               style={styles.cancelButton}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// };

// export default MemberDirectorys;




import React, { useState, useEffect } from "react";
import styles from './firststyle'
import { FlatList, PermissionsAndroid, Pressable } from "react-native";
import axios, { formToJSON } from "axios";
import Constants from "../../../Redux/Constants";
import Storage from "../../../components/LocalStorage";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    ImageBackground,
    Image,
    Modal,
} from "react-native";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import CustomHeader from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../../components/Loader";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from "react-native-linear-gradient";

const MemberDirectorys = ({ route }) => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("")
    const [googleAddressLink, setGoogleAddressLink] = useState("")
    const [phone, setPhone] = useState("");
    const [whatsAppNo, setWhatsAppNo] = useState("");
    const [directorName, setDirectorName] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState("");
    const [directorPhoto, setDirectorPhoto] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);
    const [logoImage, setLogoImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
    const [imageType, setImageType] = useState("");
    const [loader, setLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [jewelryOptions, setJewelryOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryImagesname] = useState('')
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    useEffect(() => {
        fetchJewelryTypes();
    }, []);

    useEffect(() => {
        if (initialDataLoaded) {
            setDirectorName((prev) => {
                if (!Array.isArray(prev)) return [];
                return prev.filter((name) => jewelryOptions.includes(name));
            });
        }
    }, [jewelryOptions]);

    const fetchJewelryTypes = async () => {
        try {
            setLoading(true);
            const user_token = await AsyncStorage.getItem("user_token");
            if (!user_token) {
                Toast.show("User token not found");
                return;
            }
            const response = await axios.get(`${Constants.MainUrl}member/get/jewellery/types`, {
                headers: { Authorization: `${user_token}` },
            });
            if (response.data?.code === 200) {
                const types = response.data.data || [];
                const newOptions = types.map((type) => type.type);
                setJewelryOptions(newOptions);
                setInitialDataLoaded(true);
            } else {
                Toast.show(response.data?.message || "Failed to fetch jewelry types");
            }
        } catch (error) {
            Toast.show(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (option) => {
        if (true) {
            setDirectorName((prev) => {
                if (Array.isArray(prev)) {
                    return prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option];
                }
                return [option];
            });
        }
    };

    useEffect(() => {
        if (route.params) {
            setName(route.params.name || "");
            setAddress(route.params.address || "");
            setPhone(route.params.phone || "");
            setCategoryDetail(route.params.directorName.join('') || "");
            setWhatsAppNo(route?.params?.whatsAppNo || "");
            setGoogleAddressLink(route?.params?.googleAddressLink || "");
            let directorNameData = route.params.categoryDetail;
            setDirectorName(Array.isArray(directorNameData) ? directorNameData : []);
            setLogoImage(route.params.logoImage
                ? { uri: route.params.logoImage }
                : { uri: "https://via.placeholder.com/120" }
            );
            setDirectorPhoto(
                Array.isArray(route.params.directorPhoto)
                    ? route.params.directorPhoto.map((url) => ({ uri: url }))
                    : []
            );



            setCategoryImages(
                Array.isArray(route.params.categoryImages)
                    ? route.params.categoryImages.map((item) => ({
                        uri: item?.uri?.image ? { image: item.uri.image } : { image: item.image },
                        name: item.name || ""
                    }))
                    : []
            );

        }
    }, [route.params]);


    const handlePersonalDetails = async () => {
        try {
            setLoader(true);
            const user_token = await AsyncStorage.getItem("user_token");
            if (!user_token) {
                Toast.show("Session expired. Please log in again.");
                navigation.navigate("Login");
                return;
            }
            if (!validateInputs()) return;
            const formData = prepareFormData();
            console.log(JSON.stringify(formData), 'formdat....................');

            const finalToken = user_token.startsWith("Bearer ") ? user_token : `Bearer ${user_token}`;
            if (route.params?.editMode) {
                await handleUpdateCompanyProfile();
                return;
            }
            const response = await axios.post(`${Constants.MainUrl}member/add/company/profile`, formData, {
                headers: {
                    Authorization: finalToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.code === 200) {
                Toast.show("Details saved successfully!");
                navigation.navigate('MemberDirectoryTemplate');
            } else {
                Toast.show(response.data.message || "Something went wrong");
            }
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoader(false);
        }
    };
    const getFileDetails = (uri) => {
        return {
            uri,
            name: uri?.split("/").pop(),
            type: "image/jpeg",
        };
    };

    const handleUpdateCompanyProfile = async () => {
        try {
            setLoader(true);
            console.log("Updating Company Profile...");
            const user_token = await AsyncStorage.getItem("user_token");
            const user_id = await AsyncStorage.getItem("user_id");
            if (!user_token) {
                console.error("User token is missing or expired.");
                Toast.show("Session expired. Please log in again.");
                navigation.navigate("Login");
                return;
            }
            // console.log("User token exists:", user_token);
            if (!validateInputs()) return;
            const formData = new FormData();
            console.log(formData, 'handleUpdateCompanyProfile..............');

            formData.append("company_name", name);
            formData.append("contact", phone);
            formData.append("short_description", categoryDetail);
            formData.append("whatsapp_number", whatsAppNo);
            formData.append("google_map_link", googleAddressLink);
            directorName.forEach(item => {
                formData.append("type_of_jewellery", item);
            })
            formData.append("address", address);
            if (logoImage?.uri) {
                const logoDetails = getFileDetails(logoImage.uri);
                formData.append("company_logo", logoDetails);
            }
            directorPhoto.forEach((photo, index) => {
                if (photo?.uri) {
                    const photoDetails = getFileDetails(photo.uri);
                    formData.append(`slider_images`, photoDetails);
                }
            });

            // categoryImages.forEach((image, index) => {
            //     if (image?.uri?.image) {
            //         const imageDetails = getFileDetails(image.uri.image);

            //         // Append image
            //         formData.append(`collection_photos`, imageDetails);


            //         formData.append(`collection_photo_title`, image.uri.name);
            //     }
            // });
            categoryImages.forEach((image, index) => {
                if (image?.uri?.image) {
                    const imageDetails = getFileDetails(image.uri.image);
                    formData.append(`collection_photos`, imageDetails);

                    const labelName = image.name || 'Collection Image';
                    // Only label name without extension
                    formData.append('collection_photo_title', labelName);
                }
            });

            // categoryImages.forEach((image, index) => {
            //     if (image?.uri?.image) {
            //         console.log(image, 'image2222222222222222');

            //         const imageDetails = getFileDetails(image.uri.image);

            //         formData.append(`collection_photos`, imageDetails);

            //         const uri = image.uri.image;
            //         const labelName = image.name || 'Collection Image';
            //         const extension = uri.split('.').pop();

            //         const finalName = `${labelName}.${extension}`;
            //         formData.append('collection_photo_title', finalName);
            //         // formData.append(`collection_photo_title`, image?.name);
            //     }
            // });
            const response = await axios.post(
                `${Constants.MainUrl}member/update/company/details`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: user_token,
                    },
                }
            );
            if (response.data.code === 200) {
                Toast.show("Profile updated successfully!");

                navigation.navigate("MemberDirectoryTemplate");
            } else {
                Toast.show(response.data.message || "Something went wrong during update");
            }
        } catch (error) {
            console.error("API Request Failed:", error);

            if (error.message.includes("Network Error")) {
                Toast.show("Network error! Please check your internet connection.");
            } else {
                Toast.show(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setLoader(false);
        }
    };

    const handleApiError = (error) => {
        console.error(" API Request Failed:", error?.response?.data || error);
        if (error.response) {
            console.error(" Error Response Data:", JSON.stringify(error.response.data, null, 2));
        }
        Toast.show(error.response?.data?.message || "Something went wrong");
    };

    const validateInputs = () => {
        if (!name.trim()) {
            Toast.show("Please enter company name");
            return false;
        }
        if (!categoryDetail.trim()) {
            Toast.show("Please enter short description");
            return false;
        }
        if (directorName.length === 0) {
            Toast.show("Please select at least one category detail");
            return false;
        }
        if (phone.length !== 10 || isNaN(phone)) {
            Toast.show("Please enter a valid phone number");
            return false;
        }
        if (!address.trim()) {
            Toast.show("Please enter your address");
            return false;
        }
        if (!logoImage?.uri) {
            console.error("Please upload logo image:", logoImage);
            Toast.show("Please upload logo image");
            return false;
        }
        if (directorPhoto.length < 1) {
            Toast.show("Please upload at least 1 slider image");
            return false;
        }
        if (categoryImages.length < 1) {
            Toast.show("Please upload at least 1 product image");
            return false;
        }
        for (let image of categoryImages) {
            if (!image.name || image.name.trim() === "") {
                Toast.show("Please add a label for each uploaded image.");
                return false;
            }
        }
        return true;
    };

    const prepareFormData = () => {
        const formData = new FormData();


        formData.append("company_name", name);
        formData.append("contact", phone);
        formData.append("short_description", categoryDetail);
        formData.append("whatsapp_number", whatsAppNo);
        formData.append("google_map_link", googleAddressLink);
        directorName.forEach(item => {
            formData.append("type_of_jewellery", item);
        })
        formData.append("address", address);
        formData.append("company_logo", {
            uri: logoImage.uri,
            name: logoImage.name,
            type: logoImage.type
        });
        directorPhoto.forEach((photo) => {
            formData.append("slider_images", {
                uri: photo.uri,
                type: photo.type || "image/jpeg",
                name: photo.name || `slider.jpg`,
            });
        });

        // categoryImages.forEach((image, index) => {
        //     if (image?.uri?.image) {
        //         console.log(image, 'image2222222222222222');

        //         const imageDetails = getFileDetails(image.uri.image);

        //         formData.append(`collection_photos`, imageDetails);

        //         const uri = image.uri.image;
        //         const labelName = image.name || 'Collection Image';
        //         const extension = uri.split('.').pop();

        //         const finalName = `${labelName}.${extension}`;
        //         formData.append('collection_photo_title', finalName);
        //         // formData.append(`collection_photo_title`, image?.name);
        //     }
        // });

        categoryImages.forEach((image, index) => {
            if (image?.uri?.image) {
                const imageDetails = getFileDetails(image.uri.image);
                formData.append(`collection_photos`, imageDetails);

                const labelName = image.name || 'Collection Image';
                console.log(labelName, 'labelName');

                const cleanedLabel = labelName.split('.').slice(0, -1).join('.') || labelName;

                console.log(` Sending label:`, cleanedLabel);
                formData.append('collection_photo_title', cleanedLabel);
            }
        });

        console.log(formData, 'prepareFormData');
        return formData;
    };

    useEffect(() => {
        if (route.params?.editMode) { } else {
            apiCall()
        };
    }, []);

    const apiCall = async () => {
        setIsLoading(true);
        const user_token = await AsyncStorage.getItem(Storage.user_token);
        const user_id = await AsyncStorage.getItem(Storage.user_id)
        let config = {
            method: 'get',
            url: `${Constants.MainUrl}member/get/member/details`,
            headers: {
                'Authorization': `${user_token}`,
            },
        };

        try {
            const response = await axios(config);
            if (response.data.code === 200) {
                setIsLoading(true);
                const data = response.data.data;
                if (data.businessDetails) {
                    setName(data.businessDetails.businessName || "");
                    setAddress(data.businessDetails.address || "");
                    setPhone(data.businessDetails.phone || "");
                } else {
                    setIsLoading(true);
                }
            } else {
                setIsLoading(true);
                Toast.show(response.data.message || "Failed to fetch data");
            }
        } catch (error) {
            if (error.response) {
                console.log('Error Response:', error.response.data);
            }
            Toast.show(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    // const requestCameraPermission = async () => {
    //     if (Platform.OS === "android") {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 {
    //                     title: "Camera Permission",
    //                     message: "App needs access to your camera for capturing photos.",
    //                     buttonPositive: "OK",
    //                 }
    //             );
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 return true;
    //             } else {
    //                 Toast.show("Camera permission denied");
    //                 return false;
    //             }
    //         } catch (err) {
    //             console.warn(err);
    //             return false;
    //         }
    //     } else {
    //         return true;
    //     }
    // };
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs access to your camera for capturing photos.',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            // iOS camera permission
            const result = await request(PERMISSIONS.IOS.CAMERA);
            return result === RESULTS.GRANTED;
        }
    };

    const handlePhotoUpload = (source) => {
        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            saveToPhotos: true,
            selectionLimit: source === 'gallery' ? 0 : 1,
        };

        const handleImageResponse = (response) => {
            if (response.didCancel) {
                Toast.show("Image selection cancelled");
                return;
            }
            if (response.errorCode) {
                Toast.show(`Error: ${response.errorCode}`);
                return;
            }

            const selectedImages2 = response.assets.map((asset) => ({
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            }));
            if (response.assets && response.assets.length > 0) {
                const selectedImages = response.assets.map((asset) => ({


                    uri: { image: asset.uri },
                    name: "",
                }));
                if (imageType === "logo") {
                    setLogoImage(selectedImages2[0]);
                }

                else if (imageType === "director") {
                    if (directorPhoto.length + selectedImages2.length <= 5) {

                        setDirectorPhoto([...directorPhoto, ...selectedImages2]);
                    } else {
                        Toast.show("You can only upload up to 5 director images");
                    }
                }
                else if (imageType === "category") {
                    if (categoryImages.length + selectedImages.length <= 15) {
                        setCategoryImages([...categoryImages, ...selectedImages]);


                    } else {
                        Toast.show("You can only upload up to 15 category images");
                    }
                }
            }
        };

        if (source === "camera") {
            requestCameraPermission().then((granted) => {
                if (granted) {
                    launchCamera(options, handleImageResponse);
                }
            });
        } else if (source === "gallery") {
            launchImageLibrary(options, handleImageResponse);
        }
    };

    const handleDeleteImage = (type, index) => {
        if (type === "director") {
            const updatedPhotos = directorPhoto.filter((_, i) => i !== index);
            setDirectorPhoto(updatedPhotos);
        } else if (type === "category") {
            const updatedPhotos = categoryImages.filter((_, i) => i !== index);
            setCategoryImages(updatedPhotos);
        } else if (type === "logo") {
            setLogoImage(null);
        }
    };

    const handleImagePreview = (uri) => {
        setSelectedImage(uri);
        setIsModalVisible(true);
    };

    const getImageUri = (item) => {
        try {
            // Check if the item or item.uri is undefined or null
            if (!item || !item.uri) return null;

            // If uri is a direct string, return it
            if (typeof item.uri === 'string') {
                return item.uri;
            }

            // If uri is an object and has an 'image' field as string, return it
            if (item.uri && typeof item.uri.image === 'string') {
                return item.uri.image;
            }

            // If uri is an object and has a 'uri' field as string, return it
            if (item.uri && typeof item.uri.uri === 'string') {
                return item.uri.uri;
            }
        } catch (error) {
            console.warn("Error resolving image URI:", error);
        }

        // If no valid URI is found, return null
        return null;
    };


    return (

        <View style={styles.container}>
            <CustomHeader
                title={"Our Company Profile"}
                onPress={() => navigation.goBack()}
                onPress2={() => navigation.navigate("Notification")}
            />
            {loader || loader ? <Loading /> : null}
            {/* <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                keyboardShouldPersistTaps="handled"
                // extraScrollHeight={40}
                extraScrollHeight={Platform.OS === 'ios' ? 60 : 0}
                keyboardOpeningTime={10}

            > */}

                <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.main}>
                        <Text style={styles.heading}>
                            Company  Name <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={[styles.input, { fontSize: 12 }]}
                            placeholder="Enter company name"
                            onFocus={() => setDropdownOpen(false)}
                        />
                        <Text style={styles.heading}>
                            Short Description <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <TextInput
                            value={categoryDetail}
                            onChangeText={(text) => setCategoryDetail(text)}
                            placeholder="Enter short description"
                            style={[styles.input, { fontSize: 12 }]}
                            onFocus={() => setDropdownOpen(false)}
                        />

                        <Text style={styles.heading}>
                            Category Details <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <Pressable
                            style={[styles.input, styles.dropdown]}
                            onPress={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <Text style={directorName.length > 0 ? styles.dropdownTextSelected : styles.dropdownText}>
                                {directorName.length > 0 ? directorName.join(", ") : "Select Category Details"}
                            </Text>
                        </Pressable>
                        {dropdownOpen && (
                            <View style={[styles.dropdownList, { maxHeight: 250 }]}>
                                {jewelryOptions.length > 0 ? (
                                    <FlatList
                                        data={jewelryOptions}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <Pressable
                                                style={styles.dropdownItem}
                                                onPress={() => handleSelect(item)}
                                            >
                                                {console.log('this is dircetor name', directorName)
                                                }
                                                <View style={styles.checkbox}>
                                                    {directorName.includes(item.toString()) && <View style={styles.checked} />}
                                                </View>
                                                <Text style={styles.dropdownItemText}>{item}</Text>
                                            </Pressable>
                                        )}
                                        nestedScrollEnabled={true}
                                        keyboardShouldPersistTaps="handled"
                                        style={{ maxHeight: 180 }}
                                    />
                                ) : (
                                    <Text style={{ textAlign: "center", padding: 10 }}>No categories available</Text>
                                )}
                                <TouchableOpacity
                                    onPress={() => setDropdownOpen(false)}
                                    style={styles.optionButton}
                                >
                                    <Text style={styles.optionText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <Text style={styles.heading}>
                            Phone Number <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={[styles.input, { fontSize: 12 }]}
                            keyboardType="number-pad"
                            placeholder="Enter phone number"
                            maxLength={10}
                            onFocus={() => setDropdownOpen(false)}
                        />
                        <Text style={styles.heading}>
                            WhatsApp Number
                        </Text>
                        <TextInput
                            value={whatsAppNo}
                            onChangeText={(text) => {
                                const filteredText = text.replace(/[^0-9]/g, "");
                                setWhatsAppNo(filteredText);
                            }}
                            style={[styles.input, { fontSize: 12 }]}
                            keyboardType="number-pad"
                            placeholder="Enter WhatsApp phone number"
                            maxLength={10}
                            onFocus={() => setDropdownOpen(false)}
                        />
                        <Text style={styles.heading}>
                            Address <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <TextInput
                            value={address}
                            onChangeText={setAddress}
                            style={[styles.input, { fontSize: 12 }]}
                            placeholder="Enter address"
                            placeholderTextColor="#888"
                            multiline={true}
                            onFocus={() => setDropdownOpen(false)}
                        />
                        <Text style={styles.heading}>
                            Google Maps
                        </Text>
                        <TextInput
                            value={googleAddressLink}
                            onChangeText={setGoogleAddressLink}
                            style={[styles.input, { fontSize: 12 }]}
                            placeholder="google Address"
                            placeholderTextColor="#888"
                            multiline={true}
                            onFocus={() => setDropdownOpen(false)}
                        />

                        <Text style={styles.heading}>
                            Logo <Text style={{ color: "red" }}>*</Text>
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setImageType("logo");
                                setIsOptionModalVisible(true);
                            }}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.uploadButton}>
                                <Text style={styles.uploadText}>Upload Logo</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        {logoImage?.uri ? (
                            <View style={styles.imageWrapper1}>

                                <View >
                                    <TouchableOpacity
                                        onPress={() => handleImagePreview(logoImage.uri)}
                                        style={styles.photoTouch}
                                    >
                                        <Image source={{ uri: logoImage.uri }} style={styles.photo} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDeleteImage("logo")}
                                        style={styles.deleteButton2}
                                    >
                                        <Text style={styles.deleteText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.heading}>
                                Slider Images <Text style={{ color: "red" }}>*</Text>
                            </Text>
                            <View style={styles.rowContainer}>
                                <Text style={styles.imageSizeText}>(Max size: 300x300px)</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setImageType("director");
                                setIsOptionModalVisible(true);
                            }}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.uploadButton}>
                                <Text style={styles.uploadText}>Upload Images</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginBottom: -50 }}>
                            Maximum 5 images can be uploaded.
                        </Text>

                        <View style={styles.photoContainer}>
                            {directorPhoto.map((item, index) => (

                                item?.uri ? (
                                    <View key={index} style={styles.imageWrapper}>
                                        <TouchableOpacity
                                            onPress={() => handleImagePreview(item.uri)}
                                            style={styles.photoTouch}
                                        >
                                            <Image source={{ uri: item.uri }} style={styles.photo} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDeleteImage("director", index)}
                                            style={styles.deleteButton2}
                                        >
                                            <Text style={styles.deleteText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            ))}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 40 }}>
                            <Text style={styles.heading}>
                                Product Images <Text style={{ color: "red" }}>*</Text>
                            </Text>
                            <View style={styles.rowContainer}>
                                <Text style={styles.imageSizeText}>(Max size: 300x300px)</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setImageType("category");
                                setIsOptionModalVisible(true);
                            }}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.uploadButton}>
                                <Text style={styles.uploadText}>Upload Images</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: "#888", marginTop: 10, marginBottom: -50 }}>
                            Maximum 15 images can be uploaded.
                        </Text>

                        <View style={styles.photoContainer}>
                            {categoryImages.map((item, index) =>
                                item?.uri ? (
                                    <View key={index} style={styles.imageWrapper3}>
                                        <TouchableOpacity
                                            onPress={() => handleImagePreview(getImageUri(item))}
                                            style={styles.photoTouch}
                                        >
                                            <Image
                                                source={{ uri: getImageUri(item) }}
                                                style={styles.photo}
                                            />
                                        </TouchableOpacity>

                                        <View style={{ position: 'relative' }}>
                                            {categoryImages[index]?.name === "" && (
                                                <Text
                                                    style={{
                                                        alignSelf: 'center',
                                                        position: 'absolute',
                                                        left: 15,
                                                        right: 10,
                                                        top: 3,
                                                        fontSize: 9,
                                                        color: '#888',
                                                        zIndex: 0,
                                                         
                                                    }}
                                                >
                                                    Enter label (e.g. Ring)
                                                </Text>
                                            )}
                                            <TextInput
                                                style={[styles.imageLabelInput, { fontSize: 14, color: '#000', zIndex: 1, backgroundColor: "#FFFFFF" }]}
                                                value={categoryImages[index]?.name || ""}

                                                onChangeText={(text) => {
                                                    const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, "");
                                                    const updatedImages = [...categoryImages];
                                                    updatedImages[index].name = filteredText;
                                                    setCategoryImages(updatedImages);
                                                }}

                                            />
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => handleDeleteImage("category", index)}
                                            style={styles.deleteButton2}
                                        >
                                            <Text style={styles.deleteText}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            )}
                        </View>

                        <Modal
                            visible={modalVisible}
                            animationType="fade"
                            transparent={true}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.closeButton}
                                    >
                                        <Text style={styles.closeText}>X</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: selectedImageUri }}
                                        style={styles.fullScreenImage}
                                    />
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity
                            onPress={handlePersonalDetails}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.touch1}>
                                <Text style={styles.text}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            {/* </KeyboardAwareScrollView> */}
            {selectedImage && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >

                    <View style={styles.modalContainer}>
                        <Image source={{ uri: selectedImage }} style={styles.modalImage} />

                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            style={styles.deleteButton1}
                        >
                            <Text style={styles.deleteText1}>X</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}

            <Modal
                visible={isOptionModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsOptionModalVisible(false)}
            >
                <View style={styles.optionModal}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.modalHeading}>Choose an Option</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setIsOptionModalVisible(false);
                                setTimeout(() => {
                                    handlePhotoUpload("camera");
                                }, 500);
                            }}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.optionButton}>
                                <Text style={styles.optionText}>Camera</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                setIsOptionModalVisible(false);
                                setTimeout(() => {
                                    handlePhotoUpload("gallery");
                                }, 500)
                            }}

                        >
                            <LinearGradient
                                colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.optionButton}>
                                <Text style={styles.optionText}>Gallery</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsOptionModalVisible(false)}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MemberDirectorys;