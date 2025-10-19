require('dotenv').config();
const { Pool } = require('pg');

// Old database connection (local PostgreSQL)
const oldPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'companydb',
  password: 'varalakshmi@2023',
  port: 5432,
});

// New database connection (Neon DB)
const newPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function migrateData() {
  console.log('🚀 Starting data migration to Neon DB...');
  
  try {
    // Connect to old database
    console.log('📥 Connecting to old database...');
    const oldClient = await oldPool.connect();
    console.log('✅ Connected to old database');
    
    // Connect to new database
    console.log('📤 Connecting to Neon DB...');
    const newClient = await newPool.connect();
    console.log('✅ Connected to Neon DB');
    
    // Get all companies from old database
    console.log('📋 Fetching companies from old database...');
    const companies = await oldClient.query('SELECT * FROM companies ORDER BY id');
    console.log(`Found ${companies.rows.length} companies to migrate`);
    
    if (companies.rows.length === 0) {
      console.log('ℹ️ No companies to migrate');
      return;
    }
    
    // Clear existing data in Neon DB (optional - remove this if you want to keep existing data)
    console.log('🧹 Clearing existing data in Neon DB...');
    await newClient.query('DELETE FROM companies');
    
    // Insert companies into Neon DB
    console.log('📤 Migrating companies to Neon DB...');
    let migratedCount = 0;
    
    for (const company of companies.rows) {
      try {
        await newClient.query(
          'INSERT INTO companies (id, name, location, industry, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
          [company.id, company.name, company.location, company.industry, company.created_at, company.updated_at]
        );
        migratedCount++;
        console.log(`✅ Migrated: ${company.name}`);
      } catch (error) {
        console.log(`⚠️ Failed to migrate ${company.name}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 Migration completed!`);
    console.log(`📊 Successfully migrated ${migratedCount} out of ${companies.rows.length} companies`);
    
    // Verify migration
    console.log('\n🔍 Verifying migration...');
    const verifyResult = await newClient.query('SELECT COUNT(*) as count FROM companies');
    console.log(`✅ Neon DB now has ${verifyResult.rows[0].count} companies`);
    
    // Show sample data
    const sampleData = await newClient.query('SELECT id, name, location, industry FROM companies LIMIT 5');
    console.log('\n📋 Sample migrated companies:');
    sampleData.rows.forEach((company, index) => {
      console.log(`${index + 1}. ${company.name} (${company.location}) - ${company.industry}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await oldPool.end();
    await newPool.end();
    process.exit(0);
  }
}

migrateData();
