import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postMemberItems(action){
  console.log('items to post for member packing list:', action.payload);
  let itemArray = action.payload.itemArray;
  for(let i = 0; i < itemArray.length; i++){
    console.log('posting item:', itemArray[i]);
    
    try {
      yield axios({
          method: 'POST',
          url: `/api/packingList/${action.payload.trip_id}`,
          data: itemArray[i]
      })
    } catch (error) {
        console.log('error adding packing list items', error);
    }
  }
}

function* getPackingList(action){
    console.log('getting packing list. trip id:', action.payload);
  //the payload is the trip id
  let response = yield axios({
    method: 'GET',
    url: `/api/packingList/${action.payload}`
  })
  console.log('packing list coming back from server:', response.data);
  yield put({type: 'SET_PACKING_LIST', payload: response.data});
  
}


function* allTripsSaga() {
    yield takeLatest('POST_MEMBER_ITEMS', postMemberItems)
    yield takeLatest('GET_PACKING_LIST', getPackingList)

}

export default allTripsSaga;
