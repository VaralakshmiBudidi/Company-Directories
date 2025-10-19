require('dotenv').config();
const { pool } = require('./config/database');

async function removeUniqueConstraint() {
  console.log('🔧 Removing UNIQUE constraint from companies.name...');
  
  try {
    const client = await pool.connect();
    
    // Check if the unique constraint exists
    const constraintCheck = await client.query(`
      SELECT constraint_name 
      FROM information_schema.table_constraints 
      WHERE table_name = 'companies' 
      AND constraint_type = 'UNIQUE'
      AND constraint_name LIKE '%name%'
    `);
    
    if (constraintCheck.rows.length > 0) {
      console.log('Found unique constraint:', constraintCheck.rows[0].constraint_name);
      
      // Drop the unique constraint
      await client.query(`
        ALTER TABLE companies 
        DROP CONSTRAINT ${constraintCheck.rows[0].constraint_name}
      `);
      
      console.log('✅ Unique constraint removed successfully!');
    } else {
      console.log('ℹ️ No unique constraint found on name field');
    }
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error removing constraint:', error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

removeUniqueConstraint();
