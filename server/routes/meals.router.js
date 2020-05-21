const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:trip_id', (req, res) => {
    let queryText = ''
});

//post a meal with its trip_id
router.post('/:trip_id', (req, res) => {
    let queryText = "INSERT INTO meals (name, meal, day, trip_id ) VALUES($1, $2, $3, $4);"
    
});

module.exports = router;