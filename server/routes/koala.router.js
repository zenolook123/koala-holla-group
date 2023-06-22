const express = require('express');
const koalaRouter = express.Router();

const pool = require('../modules/pool')

// DB CONNECTION

// GET
koalaRouter.get('/', (req, res) => {

    let queryText = 'SELECT * FROM "koalas"'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting koala data', error)
        res.sendStatus(500)
    })
});

// POST


// PUT
koalaRouter.put('/:id', (req, res) => {
    const idToUpdate = req.params.id
    let query = `UPDATE "koalas" SET "transfer" = 'true'
    WHERE id = $1`;
    pool.query(query, [idToUpdate])

.then((results) => {
    console.log("success in the router.put")
    res.sendStatus(200)
})
.catch((error) => {
    console.log('error making DB query', error)
    res.sendStatus(500)
})
});

// DELETE

module.exports = koalaRouter;