const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: 'SweeftCareer23',
  host: 'localhost',
  port: 5432,
  database: 'postgres'
});

module.exports = pool;