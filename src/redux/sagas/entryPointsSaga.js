import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
//this will be just for getting all the users trips
function* getEntryPoints(){
    console.log('get entry points');
    let response = yield axios({
       method: 'GET',
       url: `/api/entryPoints`,
    })
    
    yield put({type: 'SET_ENTRY_POINTS', payload: response.data});
    
}
// function* suggestedEntryPoints(action){
//     console.log('actiosdaijas', action.payload);
    
//     let tripDifficultyLevel = action.payload.trip.difficulty;
//     let eps = action.payload.eps
//     console.log('ashfasnjfaafasd', tripDifficultyLevel, eps);
    
// }


function* entryPointsSaga() {
  yield takeLatest('GET_ENTRY_POINTS', getEntryPoints);
//   yield takeLatest('SET_SUGGESTED_EPS', suggestedEntryPoints);

}

export default entryPointsSaga;
