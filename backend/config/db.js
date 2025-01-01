require('dotenv').config();
const { Pool } = require('pg');

// Configure PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required if your host enforces SSL
  },
});

// Test Database Connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = pool;