import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addMeal(action){
    let meal = action.payload.newMeal;
    let trip_id = action.payload.trip_id;
    console.log(action.payload);
    
    try {
        yield axios({
            method: 'POST',
            url: `/api/meals/${trip_id}`,
            data: meal
        })
        yield put({ type: 'GET_MEALS', payload: trip_id });
    }
    catch (error) {
        console.log(error);
    }
}

function* getMeals(action){
    let trip_id = action.payload;
    let response = yield axios({
        method: 'GET',
        url: `/api/meals/${trip_id}` 
    })
    let meals = [];
    let day = [];
    let meal = {
        name: '',
        ingredients: [],
        day: 0,
        meal: 0
    };
    let ingredients = [];
    let rows = response.data;
    console.log(rows);
    let meal_id = rows[0].meal_id;
    for(let row of rows){
        if(row.meal_id == meal_id){
            console.log(row.meal_id);
            
        }
        else{
            meal_id = row.meal_id;
            console.log(meal_id);
            
        }
    }
    
    // yield put ({type:'SET_MEALS', payload: })
}

function* membersSaga() {
    yield takeLatest('ADD_MEAL', addMeal)
    yield takeLatest('GET_MEALS', getMeals)

}


export default membersSaga;


