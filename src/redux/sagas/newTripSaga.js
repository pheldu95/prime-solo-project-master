import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createTrip(action){
    console.log(action.payload);
    
    try {
        yield axios({
            method: 'POST',
            url: '/api/trip',
            data: {title: 'New Trip', user_id: action.payload}
        })
        // yield put({
        //     type: 'GET_GIFS_FROM_FAVORITES'
        // })
    } catch (error) {
        console.log(error);
    }
}

function* postPageOne(action){
    // console.log('payload in postPageOne', action.payload);
    // let dataToPost = action.payload;
    // try {
    //     yield axios({
    //         method: 'POST',
    //         url: '/api/trip',
    //         data: dataToPost
    //     })
    //     // yield put({
    //     //     type: 'GET_GIFS_FROM_FAVORITES'
    //     // })
    // } catch (error) {
    //     console.log(error);
    // }
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
function* newTripSaga() {
  yield takeLatest('CREATE_TRIP', createTrip);
  yield takeLatest('GET_TRIPS', postMembers);  
  yield takeLatest('PAGE_1_DATA', postPageOne);
  yield takeLatest('PAGE_1_DATA', postMembers);

}


export default newTripSaga;
