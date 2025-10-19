require('dotenv').config();
const { connectDB, pool } = require('./config/database');

async function testConnection() {
  console.log('🔍 Checking database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  // Determine which database we're connecting to
  if (process.env.DATABASE_URL) {
    console.log('🌐 Using Neon DB (Cloud PostgreSQL)');
    console.log('Connection String:', process.env.DATABASE_URL.substring(0, 50) + '...');
  } else {
    console.log('💻 Using Local PostgreSQL');
    console.log('Host:', process.env.DB_HOST || 'localhost');
    console.log('Database:', process.env.DB_NAME || 'companydb');
  }
  
  try {
    await connectDB();
    console.log('✅ Connection successful!');
    
    // Get database information
    const dbInfo = await pool.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip,
        version() as postgres_version
    `);
    
    console.log('\n📊 Database Information:');
    console.log('Database Name:', dbInfo.rows[0].database_name);
    console.log('Current User:', dbInfo.rows[0].current_user);
    console.log('Server IP:', dbInfo.rows[0].server_ip || 'Local/Cloud');
    console.log('PostgreSQL Version:', dbInfo.rows[0].postgres_version.split(' ')[0]);
    
    // Test a simple query
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    // Check if companies table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'companies'
      );
    `);
    console.log('✅ Companies table exists:', tableCheck.rows[0].exists);
    
    // Count existing companies
    const companyCount = await pool.query('SELECT COUNT(*) as count FROM companies');
    console.log('📈 Total companies in database:', companyCount.rows[0].count);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure your .env file has the correct DATABASE_URL');
    console.log('2. Verify your Neon DB credentials');
    console.log('3. Check if your Neon DB instance is running');
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testConnection();
