import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//this will be just for getting all the users trips
function* getAllTrips(){
    console.log('getAllTrips');
    let response = yield axios({
       method: 'GET',
       url: `/api/allTrips`,
    })
    yield put({type: 'SET_ALL_TRIPS', payload: response.data});
    
}

function* deleteTrip(action){
    let trip_id = action.payload; 
    //send the trip id in req.params
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/trip/${trip_id}`,
      })
        yield put({type: 'GET_ALL_TRIPS'});
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };   
}
function* allTripsSaga() {
  yield takeLatest('GET_ALL_TRIPS', getAllTrips); 
  yield takeLatest('DELETE_TRIP', deleteTrip);
}

export default allTripsSaga;
