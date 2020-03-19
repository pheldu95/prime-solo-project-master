import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this will be just for getting all the users trips
function* getAllTrips(){
    console.log('getAllTrips');
    let response = yield axios({
       method: 'GET',
       url: `/api/allTrips`,
    })
    console.log(response);
    yield put({type: 'SET_ALL_TRIPS', payload: response.data});
    
}


function* allTripsSaga() {
  yield takeLatest('GET_ALL_TRIPS', getAllTrips);
}

export default allTripsSaga;
