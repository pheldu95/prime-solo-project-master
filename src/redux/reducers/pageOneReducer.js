const pageOneReducer = (state = {}, action) => {
    //holds the trip id so the trip can be edited and updated
    //if the user goes back to the first page from NewTrip2, they will be able 
    //to change the inputs. the inputs will already have values in them from this reducer
  switch (action.type) {
    case 'HOLD_PAGE_1':
      return action.payload;
    default:
      return {
                state
            };
  }
};


export default pageOneReducer;


