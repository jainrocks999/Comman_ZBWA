import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
// import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';
import axios from 'axios';
import Constants from '../Constants';
import {
  
 
  Image,
  
} from 'react-native';
//Login
function* doLogin(action) {
  try {
    const data = {
      email: action.email,
      password: action.password,
    };
    const response = yield call(Api.fetchDataByGET, action.url, data);
    if (!response) {
      // Toast.show('Please enter  Valid user id & password   ');
    } else if (response.status == true) {
      yield put({
        type: 'User_Login_Success',
        payload: response,
      });
      AsyncStorage.setItem('Partnersrno', response.id);
      AsyncStorage.setItem('loginToken', response.token);
      action.navigation.replace('Home');
      // Toast.show(response.message);
    } else {
      yield put({
        type: 'User_Login_Error',
      });
      // Toast.show(response.message);
    }
  } catch (error) {
    console.log('error223', error);
    yield put({
      type: 'User_Login_Error',
    });
  }
}
function* fetchBannerSaga() {
  try {
    yield put({ type: 'BANNER_LOADING', payload: true });

    console.log('Calling banner API without token...');
    const response = yield call(
      axios.get,
      `${Constants.MainUrl}logistic/banner/get`
    );

    if (response?.data?.code === 200) {
      const imageUrl = response?.data?.data?.banner_image;
      const fullBannerUrl =
        imageUrl?.startsWith('http') || imageUrl?.startsWith('https')
          ? imageUrl
          : `${Constants.MainUrl}${imageUrl}`;

      console.log('Full Banner URL.........:', fullBannerUrl);

      const prefetchResult = yield call(Image.prefetch, fullBannerUrl);

      if (prefetchResult) {
        yield call(AsyncStorage.setItem, 'bannerUrl', fullBannerUrl);

        yield put({
          type: 'BANNER_FETCH_SUCCESS',
          payload: fullBannerUrl,
        });
      } else {
        yield put({ type: 'BANNER_FETCH_FAILED', payload: 'Image failed to preload' });
      }
    } else {
      yield put({ type: 'BANNER_FETCH_FAILED', payload: response.data.message || 'Something went wrong' });
    }
  } catch (error) {
    console.log('Banner API Error:', error?.message || error);
    yield put({ type: 'BANNER_FETCH_FAILED', payload: 'Failed to fetch banner' });
  } finally {
    yield put({ type: 'BANNER_LOADING', payload: false });
  }
}


export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
   yield takeEvery('FETCH_BANNER_REQUEST', fetchBannerSaga);
}
