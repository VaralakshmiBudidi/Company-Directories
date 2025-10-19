const { pool } = require('../lib/db');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({ message: 'CORS preflight' });
    return;
  }

  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  try {
    switch (req.method) {
      case 'GET':
        return await getCompanies(req, res);
      case 'POST':
        return await createCompany(req, res);
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Get all companies
async function getCompanies(req, res) {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
  }
}

// Create new company
async function createCompany(req, res) {
  try {
    const { name, location, industry } = req.body;

    if (!name || !location || !industry) {
      return res.status(400).json({ message: 'Name, location, and industry are required' });
    }

    const result = await pool.query(
      'INSERT INTO companies (name, location, industry) VALUES ($1, $2, $3) RETURNING *',
      [name, location, industry]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating company:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ message: 'Company with this name already exists' });
    } else {
      res.status(500).json({ message: 'Failed to create company', error: error.message });
    }
  }
}
