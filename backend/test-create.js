require('dotenv').config();
const { pool } = require('./config/database');

async function testCreate() {
  console.log('🧪 Testing company creation...');
  
  try {
    const client = await pool.connect();
    
    // Try to create a company
    const testData = {
      name: 'Test Company ' + Date.now(),
      location: 'Test Location',
      industry: 'Test Industry'
    };
    
    console.log('Creating company with data:', testData);
    
    const result = await client.query(
      'INSERT INTO companies (name, location, industry) VALUES ($1, $2, $3) RETURNING *',
      [testData.name, testData.location, testData.industry]
    );
    
    console.log('✅ Company created successfully:', result.rows[0]);
    
    // Clean up - delete the test company
    await client.query('DELETE FROM companies WHERE id = $1', [result.rows[0].id]);
    console.log('🧹 Test company cleaned up');
    
    client.release();
    
  } catch (error) {
    console.error('❌ Error creating company:', error.message);
    console.error('Error code:', error.code);
    console.error('Error detail:', error.detail);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

testCreate();
