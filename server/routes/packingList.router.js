const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

/**
 * POST route template
 */
router.post('/:trip_id', (req, res) => {
    console.log(req.body, req.params.trip_id, 'item to add');
    let item = req.body;
    let queryText = `INSERT INTO "packing_list_items" ("name", "quantity", "trip_id", "have")
                        VALUES ($1, $2, $3, FALSE)`
    pool.query(queryText, [item.name, item.quantity, req.params.trip_id])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log('error adding to packing_list_items');
        res.sendStatus(500);
    })
});

module.exports = router;