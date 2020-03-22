import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// i should probably change this to just tripSaga, instead of newTripSaga
function* createTrip(action){
    console.log(action.payload);
    
    try {
        let response= yield axios({
            method: 'POST',
            url: '/api/trip',
            data: {title: 'New Trip', user_id: action.payload}
        })
        //response coming from the post will be the new trip object
        let trip = response.data.rows[0];
        console.log('trip in createTrip', trip);
        
        //now we send this id to the trip reducer. which will just hold the id
        yield put({
            type: 'SET_TRIP',
            payload: trip
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
        //we will use the response to update the tripReducer
        let response= yield axios({
            method: 'PUT',
            url: `/api/trip/${pageOneData.trip_id}`,
            data: pageOneData
        })
        let trip = response.data.rows[0];
        yield put({
            type:'SET_TRIP',
            payload: trip
        })
    } catch (error) {
        console.log(error);
    }
}

//seperate function to post the members
function* postMembers(action){
    
    let members = action.payload.members;
    let trip_id = action.payload.trip_id;
    //loop through array to post each member to the db
    for(let i = 0; i < members.length; i++){
        try {
            yield axios({
            method: 'POST',
            url: `/api/members/${trip_id}`,
            data: members[i]
        })
        // yield put({
        //     type: 'GET_GIFS_FROM_FAVORITES'
        // })
        } catch (error) {
            console.log(error);
        }
    }
  
}
function* deleteTrip(action){
    let trip_id = action.payload; 
    //send the trip id in req.params
    try {
        yield axios({
            method: 'DELETE',
            url: `/api/trip/${trip_id}`,
        })
        yield put({
            type: 'GET_ALL_TRIPS'
        })
    }
    catch (error) {
        console.log(error);
        alert('Unable to delete item');
    };   
}

function* newTripSaga() {
  yield takeLatest('CREATE_TRIP', createTrip);
  yield takeLatest('PUT_PAGE_1_DATA', putPageOne);
  yield takeLatest('PUT_PAGE_1_DATA', postMembers);
  yield takeLatest('DELETE_NEW_TRIP', deleteTrip);

}


export default newTripSaga;
