require('dotenv').config();
const { pool } = require('./config/database');

async function debugDatabase() {
  console.log('🔍 Debugging Database Connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    // Get database info
    const dbInfo = await client.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip
    `);
    
    console.log('\n📊 Database Details:');
    console.log('Database Name:', dbInfo.rows[0].database_name);
    console.log('Current User:', dbInfo.rows[0].current_user);
    console.log('Server IP:', dbInfo.rows[0].server_ip);
    
    // Check if companies table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'companies'
      );
    `);
    console.log('Companies table exists:', tableExists.rows[0].exists);
    
    if (tableExists.rows[0].exists) {
      // Count rows
      const countResult = await client.query('SELECT COUNT(*) as count FROM companies');
      console.log('Total companies:', countResult.rows[0].count);
      
      // Get first few companies
      const companies = await client.query('SELECT * FROM companies LIMIT 5');
      console.log('\n📋 Sample companies:');
      companies.rows.forEach((company, index) => {
        console.log(`${index + 1}. ${company.name} (${company.location}) - ${company.industry}`);
      });
    }
    
    client.release();
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

debugDatabase();
