import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast'

export const handleUnauthorizedError = async (navigation) => {
 
  await AsyncStorage.clear();

 
  Toast.show('Session expired. Please log in again.' );

 
  // navigation.replace('FirstPage');
};