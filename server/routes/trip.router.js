const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    
});
router.post('/', (req, res) => {
    console.log('req.body in trip post', req.body);
    let newTrip = req.body;
    //RETURNING "id" comes back with the id of the row its just made
    let queryText = `INSERT INTO "trips" ("title", "user_id")
                        VALUES ($1, $2)
                        RETURNING "id";`;
    pool.query(queryText, [newTrip.title, newTrip.user_id])
    .then(result => {    
        res.send(result);
        console.log('this is the result form the post', result);
    })
    .catch(error => {
        console.log(`Error adding new trip`, error);
        res.sendStatus(500);
    });
});

router.put('/:tripId', (req, res) => {
  console.log('logging body', req.body, req.params.tripId);
  let pageOneData = req.body;
  console.log('pageOneData', pageOneData);
  
  let queryString = `UPDATE "trips" SET start_date = $1, end_date = $2, difficulty = $3, experience = $4, area = $5 WHERE "id" = ${req.params.tripId};`
  pool.query(queryString, [pageOneData.startDate, pageOneData.endDate, pageOneData.difficulty, pageOneData.experience, pageOneData.area]).then((results) => {
    res.sendStatus(200);
  }).catch((err) => {
    res.sendStatus(500);
    console.log(err);
  })
});

module.exports = router;