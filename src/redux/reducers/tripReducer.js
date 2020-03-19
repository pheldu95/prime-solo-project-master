const tripReducer = (state = {}, action) => {
    //holds the trip id so the trip can be edited and updated
  switch (action.type) {
    case 'SET_TRIP_ID':
      return action.payload;
    default:
      return state;
  }
};


export default tripReducer;


