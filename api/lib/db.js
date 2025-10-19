const { Pool } = require('pg');

// PostgreSQL connection configuration for Vercel serverless
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL Connected successfully');
    
    // Create companies table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        location VARCHAR(255) NOT NULL,
        industry VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Companies table ready');
    client.release();
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  }
};

module.exports = { pool, connectDB };
