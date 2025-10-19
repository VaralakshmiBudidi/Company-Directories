const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
});

// GET company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
});

// POST create new company
router.post('/', async (req, res) => {
  try {
    const { name, location, industry } = req.body;
    
    if (!name || !location || !industry) {
      return res.status(400).json({ message: 'Name, location, and industry are required' });
    }

    const company = await Company.create({ name, location, industry });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update company
router.put('/:id', async (req, res) => {
  try {
    const { name, location, industry } = req.body;
    
    if (!name || !location || !industry) {
      return res.status(400).json({ message: 'Name, location, and industry are required' });
    }

    const company = await Company.update(req.params.id, { name, location, industry });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.delete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
});

module.exports = router;