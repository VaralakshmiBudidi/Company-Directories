require('dotenv').config();
const { connectDB, pool } = require('./config/database');

async function testServerDatabase() {
  console.log('🔍 Testing server database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  try {
    await connectDB();
    
    // Get database info
    const dbInfo = await pool.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip
    `);
    
    console.log('\n📊 Server Database Details:');
    console.log('Database Name:', dbInfo.rows[0].database_name);
    console.log('Current User:', dbInfo.rows[0].current_user);
    console.log('Server IP:', dbInfo.rows[0].server_ip);
    
    // Count companies
    const countResult = await pool.query('SELECT COUNT(*) as count FROM companies');
    console.log('Total companies:', countResult.rows[0].count);
    
    // Show first few companies
    const companies = await pool.query('SELECT id, name, location, industry FROM companies LIMIT 5');
    console.log('\n📋 First 5 companies:');
    companies.rows.forEach((company, index) => {
      console.log(`${index + 1}. ID: ${company.id}, Name: ${company.name}, Location: ${company.location}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testServerDatabase();
