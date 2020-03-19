const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    
});
router.post('/', (req, res) => {
    console.log('req.body in trip post', req.body);
    let newTrip = req.body
    let queryText = `INSERT INTO "trips" ("title", "user_id")
                        VALUES ($1, $2);  
                        `;
    pool.query(queryText, [newTrip.title, newTrip.user_id])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding new trip`, error);
        res.sendStatus(500);
    });
});

// router.post('/', (req, res) => {
//     console.log('req.body in trip post', req.body);
//     let newTrip = req.body
//     let queryText = `INSERT INTO "trips" ("title", "user_id", "start_date", "end_date", "difficulty", "experience", "area")
//                         VALUES ($1, $2, $3, $4, $5, $6, $7);  
//                         `;
//     pool.query(queryText, [newTrip.title, newTrip.userId, newTrip.startDate, newTrip.endDate, newTrip.difficulty,
//                             newTrip.experience, newTrip.area])
//     .then(result => {
//         res.sendStatus(201);
//     })
//     .catch(error => {
//         console.log(`Error adding data to trips`, error);
//         res.sendStatus(500);
//     });
// });

module.exports = router;