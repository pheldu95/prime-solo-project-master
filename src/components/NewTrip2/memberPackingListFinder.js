//this function will find the member packing list we need 
//based on how many days the trip is

//require item arrays. these will be posted based on how long the trip is.
let fourDays = require('../ItemArrays/fourDays');
let eightDays = require('../ItemArrays/eightDays');


function memberPackingListFinder(days) {
     if(days<5){
            return fourDays;
        }else if(days>4 && days<9){//array of items if days are less than 9
            return eightDays;
        }
        
}

module.exports = memberPackingListFinder;