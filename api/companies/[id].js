const { pool } = require('../lib/db');

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  const { id } = req.query;

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
        return await getCompany(req, res, id);
      case 'PUT':
        return await updateCompany(req, res, id);
      case 'DELETE':
        return await deleteCompany(req, res, id);
      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Get company by ID
async function getCompany(req, res, id) {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Failed to fetch company', error: error.message });
  }
}

// Update company
async function updateCompany(req, res, id) {
  try {
    const { name, location, industry } = req.body;

    if (!name || !location || !industry) {
      return res.status(400).json({ message: 'Name, location, and industry are required' });
    }

    const result = await pool.query(
      'UPDATE companies SET name = $1, location = $2, industry = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [name, location, industry, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating company:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).json({ message: 'Company with this name already exists' });
    } else {
      res.status(500).json({ message: 'Failed to update company', error: error.message });
    }
  }
}

// Delete company
async function deleteCompany(req, res, id) {
  try {
    const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.status(200).json({ message: 'Company deleted successfully', company: result.rows[0] });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ message: 'Failed to delete company', error: error.message });
  }
}
