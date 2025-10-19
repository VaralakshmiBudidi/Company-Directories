require('dotenv').config();
const { pool } = require('./config/database');

async function fixSequence() {
  console.log('🔧 Fixing PostgreSQL sequence for companies table...');
  
  try {
    const client = await pool.connect();
    
    // Get the current max ID
    const maxIdResult = await client.query('SELECT MAX(id) as max_id FROM companies');
    const maxId = maxIdResult.rows[0].max_id || 0;
    console.log('Current max ID:', maxId);
    
    // Reset the sequence to start from maxId + 1
    await client.query(`ALTER SEQUENCE companies_id_seq RESTART WITH ${maxId + 1}`);
    
    console.log(`✅ Sequence reset to start from ${maxId + 1}`);
    
    // Test the sequence
    const nextValResult = await client.query('SELECT nextval(\'companies_id_seq\') as next_id');
    console.log('Next sequence value:', nextValResult.rows[0].next_id);
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error fixing sequence:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

fixSequence();
