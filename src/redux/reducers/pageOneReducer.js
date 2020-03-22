const pageOneReducer = (state = {}, action) => {
    //holds the trip id so the trip can be edited and updated
    //if the user goes back to the first page from NewTrip2, they will be able 
    //to change the inputs. the inputs will already have values in them from this reducer
  switch (action.type) {
    case 'HOLD_PAGE_1':
      return action.payload;
    default:
      return {
          //this is the default so that our local state on NewTrip1
          //is actually populated with data even if the user
          //hasn't done anything yet
          //or else NewPage1 would error out because all the attributes in the state would be trying to read
          //an undefined object
                title: '',
                startDate: '0000-00-00',
                endDate: '0000-00-00',
                difficulty: 1,
                experience: 1,
                area: 'either',
                members: []
            };
  }
};


export default pageOneReducer;


