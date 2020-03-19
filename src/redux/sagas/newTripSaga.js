import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTrip(action){
    console.log(action.payload);
    
    try {
        let response= yield axios({
            method: 'POST',
            url: '/api/trip',
            data: {title: 'New Trip', user_id: action.payload}
        })
        //response coming from the post will be the tripId.
        let tripId = response.data.rows[0].id;
        //now we send this id to the trip reducer. which will just hold the id
        yield put({
            type: 'SET_TRIP_ID',
            payload: tripId
        })
    } catch (error) {
        console.log(error);
    }
}

function* putPageOne(action){
    console.log('payload in puttPageOne', action.payload);
   //make an object to send
    let pageOneData= action.payload
    
    //send the data from the first page in a put request
    try {
        yield axios({
            method: 'PUT',
            url: `/api/trip/${pageOneData.trip_id}`,
            data: pageOneData
        })
        // yield put({
        //     type: 'GET_GIFS_FROM_FAVORITES'
        // })
    } catch (error) {
        console.log(error);
    }
}

//seperate function to post the members
function* postMembers(action){
    // let members = action.payload.members;
    //  try {
    //     yield axios({
    //         method: 'POST',
    //         url: '/api/members',
    //         data: members
    //     })
    //     // yield put({
    //     //     type: 'GET_GIFS_FROM_FAVORITES'
    //     // })
    // } catch (error) {
    //     console.log(error);
    // }
    
    
}
function* deleteTrip(action){
    console.log('delete this trip', action.payload);
    
}
function* newTripSaga() {
  yield takeLatest('CREATE_TRIP', createTrip);
  yield takeLatest('GET_TRIPS', postMembers);  
  yield takeLatest('PAGE_1_DATA', putPageOne);
  yield takeLatest('PAGE_1_DATA', postMembers);
  yield takeLatest('DELETE_NEW_TRIP', deleteTrip);

}


export default newTripSaga;
