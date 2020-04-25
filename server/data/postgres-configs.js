const { Pool } = require('pg');
const salesDbconnection = 'postgresql://postgres:123456@localhost:5432/sales';

const pool = new Pool({
  connectionString: salesDbconnection
});

module.exports = pool;
