import React, { useState, useEffect } from 'react';
import { FaTimes, FaBuilding, FaMapMarkerAlt, FaIndustry } from 'react-icons/fa';

const CreateCompanyModal = ({ isOpen, onClose, onSubmit, company = null, isEditMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    industry: ''
  });

  const [errors, setErrors] = useState({});
  const [originalData, setOriginalData] = useState({});

  const industries = ['Software', 'Environmental', 'Finance', 'Healthcare', 'Automotive'];
  const locations = ['Hyderabad', 'Chennai', 'Bangalore', 'Pune', 'Delhi', 'Vishakapatnam'];

  // Populate form when in edit mode
  useEffect(() => {
    if (isEditMode && company) {
      const companyData = {
        name: company.name || '',
        location: company.location || '',
        industry: company.industry || ''
      };
      setFormData(companyData);
      setOriginalData(companyData); // Store original data for comparison
    } else {
      setFormData({
        name: '',
        location: '',
        industry: ''
      });
      setOriginalData({}); // Clear original data for create mode
    }
  }, [isEditMode, company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('📝 Modal form submitted with data:', formData);
    
    if (validateForm()) {
      console.log('✅ Form validation passed, calling onSubmit');
      onSubmit(formData);
      setFormData({ name: '', location: '', industry: '' });
      setErrors({});
      onClose();
    } else {
      console.log('❌ Form validation failed');
    }
  };

  // Check if all fields are filled (for create mode)
  const isFormComplete = () => {
    return formData.name.trim() !== '' && 
           formData.location.trim() !== '' && 
           formData.industry.trim() !== '';
  };

  // Check if form has changes (for edit mode)
  const hasFormChanged = () => {
    if (!isEditMode || !company) return false;
    const hasChanges = formData.name !== originalData.name || 
           formData.location !== originalData.location || 
           formData.industry !== originalData.industry;
    console.log('Form changed check:', {
      isEditMode,
      hasChanges,
      formData,
      originalData
    });
    return hasChanges;
  };

  // Determine if submit button should be enabled
  const isSubmitEnabled = () => {
    if (isEditMode) {
      const formComplete = isFormComplete();
      const formChanged = hasFormChanged();
      const enabled = formChanged && formComplete;
      console.log('Submit enabled check (edit mode):', {
        formComplete,
        formChanged,
        enabled
      });
      return enabled;
    } else {
      const formComplete = isFormComplete();
      console.log('Submit enabled check (create mode):', {
        formComplete
      });
      return formComplete;
    }
  };

  const handleClose = () => {
    setFormData({ name: '', location: '', industry: '' });
    setErrors({});
    setOriginalData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-800">
              {isEditMode ? 'Edit Company' : 'Create New Company'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaBuilding className="inline mr-1" />
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-1" />
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaIndustry className="inline mr-1" />
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                  errors.industry ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isSubmitEnabled()}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isSubmitEnabled()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyModal;
