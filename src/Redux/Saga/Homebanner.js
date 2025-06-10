import {takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import Constants from '../Constants';

// Your worker saga (already written)
function* fetchBannerSaga() {
  try {
    yield put({type: 'BANNER_LOADING', payload: true});
    console.log('calling and not calling');

    console.log('Calling banner API without token...');
    const response = yield call(
      axios.get,
      `${Constants.MainUrl}logistic/banner/get`,
    );

    if (response?.data?.code === 200) {
      const imageUrl = response?.data?.data?.banner_image;
      const fullBannerUrl =
        imageUrl?.startsWith('http') || imageUrl?.startsWith('https')
          ? imageUrl
          : `${Constants.MainUrl}${imageUrl}`;

      console.log('Full Banner URL:', fullBannerUrl);

      const prefetchResult = yield call(Image.prefetch, fullBannerUrl);

      if (prefetchResult) {
        yield call(AsyncStorage.setItem, 'bannerUrl', fullBannerUrl);

        yield put({
          type: 'BANNER_FETCH_SUCCESS',
          payload: fullBannerUrl,
        });
      } else {
        yield put({
          type: 'BANNER_FETCH_FAILED',
          payload: 'Image failed to preload',
        });
      }
    } else {
      yield put({
        type: 'BANNER_FETCH_FAILED',
        payload: response.data.message || 'Something went wrong',
      });
    }
  } catch (error) {
    console.log('Banner API Error:', error?.message || error);
    yield put({type: 'BANNER_FETCH_FAILED', payload: 'Failed to fetch banner'});
  } finally {
    yield put({type: 'BANNER_LOADING', payload: false});
  }
}

// Watcher saga to listen for FETCH_BANNER_REQUEST and call fetchBannerSaga
export default function* bannerWatcherSaga() {
  yield takeEvery('FETCH_BANNER_REQUEST', fetchBannerSaga);
}
