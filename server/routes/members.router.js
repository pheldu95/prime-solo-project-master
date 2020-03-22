const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:trip_id', (req, res) => {
    console.log(req.params);
    let queryText = `SELECT * FROM "trip_members" WHERE "trip_id" = ${req.params.trip_id}`
     pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting members', error);
        res.sendStatus(500);   
    })
});

router.post('/:trip_id', (req, res) => {
    console.log('req.body in members router', req.body, req.params.trip_id);
    let member = (req.body);
   
    let queryText = `INSERT INTO "trip_members" ("trip_id", "first_name", "last_name", "age", "exercise", "email")
                        VALUES ($1, $2, $3, $4, $5, $6);`
    pool.query(queryText, [req.params.trip_id, member.firstName, member.lastName, member.age, member.exercise, member.email])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('error adding member', error);
        res.sendStatus(500);   
    })

});

module.exports = router;