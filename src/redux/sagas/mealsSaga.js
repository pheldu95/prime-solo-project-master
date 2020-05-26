import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addMeal(action){
    let meal = action.payload.newMeal;
    let trip_id = action.payload.trip_id;

    try {
        yield axios({
            method: 'POST',
            url: `/api/meals/${trip_id}`,
            data: meal
        })
        // yield put({ type: 'GET_MEMBERS', payload: trip_id });
    }
    catch (error) {
        console.log(error);
    }
}

function* membersSaga() {
    yield takeLatest('ADD_MEAL', addMeal)

}


export default membersSaga;


