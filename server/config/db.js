const { Pool } = require("pg");
require("dotenv").config();

// Create a new pool here using the connection string below
console.log(process.env.POSTGRES_C0NNECTION_STRING);
const pool = new Pool({
  connectionString: process.env.POSTGRES_C0NNECTION_STRING,
  
  ssl: {
    rejectUnauthorized: false, // Use this if your PostgreSQL server uses self-signed certificates or not using CA-signed certificates
    // You can also specify other SSL options here
  }
});

// Export the query method for passing queries to the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
