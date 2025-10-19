const { Pool } = require('pg');

// PostgreSQL connection configuration
// Support for both Neon DB (DATABASE_URL) and individual parameters
const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'companydb',
        password: process.env.DB_PASSWORD || '',
        port: process.env.DB_PORT || 5432,
      }
);

const connectDB = async () => {
  try {
    // Debug: Show which database we're connecting to
    if (process.env.DATABASE_URL) {
      console.log('🌐 Connecting to Neon DB (Cloud)');
      console.log('Database URL:', process.env.DATABASE_URL.substring(0, 50) + '...');
    } else {
      console.log('💻 Connecting to Local PostgreSQL');
      console.log('Host:', process.env.DB_HOST || 'localhost');
      console.log('Database:', process.env.DB_NAME || 'companydb');
    }
    
    // Test the connection
    const client = await pool.connect();
    console.log('PostgreSQL Connected successfully');
    
    // Create companies table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        industry VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Companies table ready');
    
    // Get database info to confirm connection
    const dbInfo = await client.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip
    `);
    
    console.log('📊 Connected to:');
    console.log('  Database:', dbInfo.rows[0].database_name);
    console.log('  User:', dbInfo.rows[0].current_user);
    console.log('  Server IP:', dbInfo.rows[0].server_ip);
    
    client.release();
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };