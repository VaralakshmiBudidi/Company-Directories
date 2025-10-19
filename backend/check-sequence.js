require('dotenv').config();
const { pool } = require('./config/database');

async function checkSequence() {
  console.log('🔍 Checking PostgreSQL sequence state...');
  
  try {
    const client = await pool.connect();
    
    // Get current sequence value
    const sequenceResult = await client.query('SELECT last_value FROM companies_id_seq');
    console.log('Current sequence value:', sequenceResult.rows[0].last_value);
    
    // Get max ID from table
    const maxIdResult = await client.query('SELECT MAX(id) as max_id FROM companies');
    const maxId = maxIdResult.rows[0].max_id;
    console.log('Max ID in table:', maxId);
    
    // Get next sequence value
    const nextValResult = await client.query('SELECT nextval(\'companies_id_seq\') as next_id');
    console.log('Next sequence value:', nextValResult.rows[0].next_id);
    
    // Check if there's a mismatch
    if (nextValResult.rows[0].next_id <= maxId) {
      console.log('❌ SEQUENCE ISSUE: Next value is less than or equal to max ID!');
      console.log('This will cause duplicate key errors.');
    } else {
      console.log('✅ Sequence is working correctly');
    }
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error checking sequence:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

checkSequence();
