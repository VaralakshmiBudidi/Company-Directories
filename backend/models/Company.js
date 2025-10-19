const { pool } = require('../config/database');

class Company {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.location = data.location;
    this.industry = data.industry;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Get all companies
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM companies ORDER BY name ASC');
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  // Get company by ID
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching company: ${error.message}`);
    }
  }

  // Create new company
  static async create(companyData) {
    try {
      const { name, location, industry } = companyData;
      const result = await pool.query(
        'INSERT INTO companies (name, location, industry) VALUES ($1, $2, $3) RETURNING *',
        [name, location, industry]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating company: ${error.message}`);
    }
  }

  // Update company
  static async update(id, companyData) {
    try {
      const { name, location, industry } = companyData;
      const result = await pool.query(
        'UPDATE companies SET name = $1, location = $2, industry = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
        [name, location, industry, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating company: ${error.message}`);
    }
  }

  // Delete company
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting company: ${error.message}`);
    }
  }
}

module.exports = Company;