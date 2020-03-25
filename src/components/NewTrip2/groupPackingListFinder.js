let twoPeople = require('../GroupItemArrays/twoPeople');

function groupPackingListFinder(members){
    if(members === 2){
        return twoPeople;
    }
}

module.exports = groupPackingListFinder;