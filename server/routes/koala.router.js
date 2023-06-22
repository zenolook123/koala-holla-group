const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

// GET
router.get('/', (req, res) => {
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