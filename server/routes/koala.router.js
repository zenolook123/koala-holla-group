const express = require('express');
const koalaRouter = express.Router();

const pool = require('../modules/pool')

// DB CONNECTION

// GET
koalaRouter.get('/', (req, res) => {
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


// DELETE

module.exports = koalaRouter;