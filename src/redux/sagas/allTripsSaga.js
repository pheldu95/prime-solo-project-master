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

// function* getMembers(action){
//   console.log('getting members. trip id:', action.payload);
//   //the payload is the trip id
//   let response = yield axios({
//     method: 'GET',
//     url: `/api/members/${action.payload}`
//   })
//   console.log('members coming back from server:', response.data);
  
//   yield put({type: 'SET_MEMBERS', payload: response.data});
  
  
// }

// function* postMemberItems(action){
//   console.log('items to post for member packing list:', action.payload);
//   let itemArray = action.payload.itemArray;
//   for(let i = 0; i < itemArray.length; i++){
//     console.log('posting item:', itemArray[i]);
    
//     try {
//       yield axios({
//           method: 'POST',
//           url: `/api/packingList/${action.payload.trip_id}`,
//           data: itemArray[i]
//       })
//     } catch (error) {
//         console.log('error adding packing list items', error);
//     }
//   }
// }
function* allTripsSaga() {
  yield takeLatest('GET_ALL_TRIPS', getAllTrips);
  // yield takeLatest('GET_MEMBERS', getMembers);
  //post member item(s) to packing list
  //yield takeLatest('POST_MEMBER_ITEMS', postMemberItems)
 
}

export default allTripsSaga;
