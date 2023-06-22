const pg = require('pg');

// Setting up pg to connect to the database
// Creating Koala database pool
const pool = new pg.Pool({
    database: 'koala_base',
    host: 'localhost',
    port: 5432
});

// Exporting pool for use in server
module.exports = pool