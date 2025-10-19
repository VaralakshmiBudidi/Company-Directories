const API_BASE_URL = 'http://localhost:5000/api';

export const companyApi = {
  // Get all companies
  getAllCompanies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) {
        throw new Error('Failed to fetch companies');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },

  // Get company by ID
  getCompanyById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch company');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  },

  // Create new company
  createCompany: async (companyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create company');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  // Update company
  updateCompany: async (id, companyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update company');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // Update company
  updateCompany: async (id, companyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update company');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // Delete company
  deleteCompany: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete company');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  }
};
