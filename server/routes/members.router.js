const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {

});

router.post('/:trip_id', (req, res) => {
    console.log('req.body in members router', req.body, req.params.trip_id);
    let members = (req.body);
    let queryText;
    for(let i = 0; i < members.length; i++){
        // console.log(members[i]);
        // console.log(req.params.trip_id);
        
        
        queryText = `INSERT INTO "trip_members" ("trip_id", "first_name", "last_name", "age", "exercise", "email")
                            VALUES ($1, $2, $3, $4, $5, $6);`
        pool.query(queryText, [req.params.trip_id, members[i].firstName, members[i].lastName, members[i].age, members[i].exercise, members[i].email])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error adding member', error);
            res.sendStatus(500);   
        })
    }
    // let queryText = `INSERT INTO "trips" ("title", "user_id", "start_date", "end_date", "difficulty", "experience", "area")
    //                     VALUES ($1, $2, $3, $4, $5, $6, $7);  
    //                     `;
    // pool.query(queryText, [newTrip.title, newTrip.userId, newTrip.startDate, newTrip.endDate, newTrip.difficulty,
    //         newTrip.experience, newTrip.area
    //     ])
    //     .then(result => {
    //         res.sendStatus(201);
    //     })
    //     .catch(error => {
    //         console.log(`Error adding data to trips`, error);
    //         res.sendStatus(500);
    //     });
});

module.exports = router;