require('dotenv').config();
const { pool } = require('./config/database');

async function checkDuplicates() {
  console.log('🔍 Checking for duplicate IDs in companies table...');
  
  try {
    const client = await pool.connect();
    
    // Check for duplicate IDs
    const duplicateResult = await client.query(`
      SELECT id, COUNT(*) as count 
      FROM companies 
      GROUP BY id 
      HAVING COUNT(*) > 1
    `);
    
    if (duplicateResult.rows.length > 0) {
      console.log('❌ Found duplicate IDs:');
      duplicateResult.rows.forEach(row => {
        console.log(`  ID ${row.id}: ${row.count} occurrences`);
      });
    } else {
      console.log('✅ No duplicate IDs found');
    }
    
    // Check for any NULL IDs
    const nullIdResult = await client.query('SELECT COUNT(*) as count FROM companies WHERE id IS NULL');
    console.log('NULL IDs count:', nullIdResult.rows[0].count);
    
    // Show last few companies
    const lastCompanies = await client.query(`
      SELECT id, name, created_at 
      FROM companies 
      ORDER BY id DESC 
      LIMIT 5
    `);
    
    console.log('\n📋 Last 5 companies:');
    lastCompanies.rows.forEach(company => {
      console.log(`  ID: ${company.id}, Name: ${company.name}, Created: ${company.created_at}`);
    });
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error checking duplicates:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

checkDuplicates();
