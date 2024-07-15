const { Pool } = require("pg");
require("dotenv").config();

// Create a new pool here using the connection string below
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the query method for passing queries to the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
