const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// router.get('/:tripId', (req, res) => {
//     let queryText = 
// });
router.post('/', (req, res) => {
    console.log('req.body in trip post', req.body);
    let newTrip = req.body;
    //RETURNING * comes back with all the info for the row that was just made
    let queryText = `INSERT INTO "trips" ("title", "user_id")
                        VALUES ($1, $2)
                        RETURNING *;`;
    pool.query(queryText, [newTrip.title, newTrip.user_id])
    .then(result => {    
        res.send(result);
    })
    .catch(error => {
        console.log(`Error adding new trip`, error);
        res.sendStatus(500);
    });
});

router.put('/:trip_id', (req, res) => {
    let pageOneData = req.body;

    //we will RETURNING * here again so we can update the tripReducer
    let queryString = `UPDATE "trips" SET title = $1, start_date = $2, end_date = $3, difficulty = $4, experience = $5, area = $6 WHERE "id" = ${req.params.trip_id} RETURNING *;`
    pool.query(queryString, [pageOneData.title, pageOneData.startDate, pageOneData.endDate, pageOneData.difficulty, pageOneData.experience, pageOneData.area]).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })
});
router.delete('/:trip_id', (req, res) => {
    //gets the trip from the url of the delete request in newTripSaga
    let trip_id = req.params.trip_id;    
    let queryText = `DELETE FROM trips WHERE id=$1`
    pool.query(queryText, [trip_id]).then((results) => {
    res.sendStatus(200);
    }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
    })
});

module.exports = router;