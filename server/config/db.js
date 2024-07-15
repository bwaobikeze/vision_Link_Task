const { Pool } = require("pg");
require("dotenv").config();

// Create a new pool here using the connection string below
// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_PORT);
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

// Export the query method for passing queries to the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
