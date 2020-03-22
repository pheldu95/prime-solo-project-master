const groupPackingListReducer = (state = [], action) => {
    //will hold the group packing list for the current trip
    switch (action.type) {
        case 'SET_PACKING_LIST':
            return action.payload;
        default:
            return [];
    }
};


export default groupPackingListReducer;
