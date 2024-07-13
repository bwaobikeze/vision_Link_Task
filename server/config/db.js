const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "plainpoints",
  password: "Kindboy30@",
  port: 5432,
});

// Export the query method for passing queries to the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
};
