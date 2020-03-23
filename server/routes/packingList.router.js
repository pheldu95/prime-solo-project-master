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
    
});

module.exports = router;