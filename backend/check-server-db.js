require('dotenv').config();
const { pool } = require('./config/database');

async function checkServerDatabase() {
  console.log('🔍 Checking which database the server is using...');
  
  try {
    const client = await pool.connect();
    
    // Get database information
    const dbInfo = await client.query(`
      SELECT 
        current_database() as database_name,
        current_user as current_user,
        inet_server_addr() as server_ip
    `);
    
    console.log('📊 Server Database Info:');
    console.log('Database Name:', dbInfo.rows[0].database_name);
    console.log('Current User:', dbInfo.rows[0].current_user);
    console.log('Server IP:', dbInfo.rows[0].server_ip);
    
    // Count companies
    const countResult = await client.query('SELECT COUNT(*) as count FROM companies');
    console.log('Total companies in server database:', countResult.rows[0].count);
    
    // Show first few companies
    const companies = await client.query('SELECT id, name, location, industry FROM companies LIMIT 3');
    console.log('\n📋 First 3 companies:');
    companies.rows.forEach((company, index) => {
      console.log(`${index + 1}. ID: ${company.id}, Name: ${company.name}, Location: ${company.location}`);
    });
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

checkServerDatabase();
