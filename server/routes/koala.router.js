const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool')

//ORDER CONNECTION

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
    let age = req.body.age;
    let gender = req.body.gender;
    let transfer = req.body.transfer;
    let note = req.body.note;

    const query = `INSERT INTO "koalas" ("name", "age", "gender", "transfer", "note") VALUES ($1, $2, $3, $4, $5);`

    pool.query(query, [name, age, gender, transfer, note])
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
    let query = `UPDATE "koalas" SET "transfer" = NOT "transfer"
    WHERE id = $1;`;
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
koalaRouter.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    let query = `DELETE FROM "koalas" WHERE "id" = $1`
    pool.query(query, [idToDelete])
    .then((results) => {
        console.log("Koala EXTERMINATED.");
        res.sendStatus(200);
    }).catch((error) => {
        console.log("Error making database query:", error);
        res.sendStatus(500);
    })
});

// Routes for order by button to order koalas depending on what order you want
// Order by name
koalaRouter.get('/orderName', (req, res) => {

    let queryText = 'SELECT * FROM "koalas" ORDER BY "name";'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting koala data', error)
        res.sendStatus(500)
    })
});

// Order by age
koalaRouter.get('/orderAge', (req, res) => {

    let queryText = 'SELECT * FROM "koalas" ORDER BY "age";'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting koala data', error)
        res.sendStatus(500)
    })
});

// Order by transfer
koalaRouter.get('/orderTransfer', (req, res) => {

    let queryText = 'SELECT * FROM "koalas" ORDER BY "transfer";'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting koala data', error)
        res.sendStatus(500)
    })
});

// Order by gender
koalaRouter.get('/orderGender', (req, res) => {

    let queryText = 'SELECT * FROM "koalas" ORDER BY "gender";'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting koala data', error)
        res.sendStatus(500)
    })
});

module.exports = koalaRouter;