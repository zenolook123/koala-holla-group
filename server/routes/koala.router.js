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
koalaRouter.post('/', (req, res) => {
    let koala = req.body
    console.log("Inside POST /, req.body:", koala);

    let name = req.body.name;
    let age = req.body.name;
    let gender = req.body.name;
    let readyForTransfer = req.body.name;
    let notes = req.body.name;

    const query = `INSERT INTO "koalas" ("name", "age", "gender", "transfer", "note") VALUES ($1, $2, $3, $4, $5);`

    pool.query(query, [name, age, gender, readyForTransfer, notes])
    .then((result) => {
        console.log("Koala inserted into table 'koalas' in 'koala_base' database.");
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query: ${query}`, error);
        res.sendStatus(500);
    })
});


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