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
    ; (async () => {
        let meal = req.body;
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            let queryText = "INSERT INTO meals (name, meal, day, trip_id ) VALUES($1, $2, $3, $4) RETURNING id;"
            let result = await client.query(queryText, [meal.name, meal.meal, meal.day, req.params.trip_id]);
            console.log('result coming back from post:', result.rows[0]);
            
            let meal_id = result.rows[0].id;
            let ingredients = meal.ingredients;
            console.log(meal_id);
            
            for(ingredient of ingredients){
                queryText = "INSERT INTO meal_ingredients (name, meal_id) VALUES ($1, $2);"                
                await client.query(queryText, [ingredient, meal_id]);
            }
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            res.sendStatus(200)
            //must release the client at the end
            //or else the client will remain unavailable if you 
            //want to use it again
            client.release()
        }
    })().catch(e => console.error(e.stack))

    
    
});

module.exports = router;