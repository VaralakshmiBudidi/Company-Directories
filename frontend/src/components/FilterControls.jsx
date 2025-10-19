import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../services/apiSlice';
import { FaSearch, FaMapMarkerAlt, FaIndustry, FaFilter } from 'react-icons/fa';

const FilterControls = () => {
  const dispatch = useDispatch();
  const companies = useSelector(state => state.company.companies);

  // Extract unique locations and industries from companies for dropdown options
  const locations = [...new Set(companies.map(c => c.location))];
  const industries = [...new Set(companies.map(c => c.industry))];

  // Local component state for filter inputs
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');

  // Effect: Update Redux filters whenever local filter inputs change
  useEffect(() => {
    dispatch(setFilters({ name, location, industry }));
  }, [name, location, industry, dispatch]);

  const clearFilters = () => {
    setName('');
    setLocation('');
    setIndustry('');
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-font16 font-bold text-gray-800">Filter & Search</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {/* Search by Name */}
        <div className="relative">
          <label className="block text-font14 font-medium text-textDark mb-2">
            <FaSearch className="inline mr-1" />
            Company Name
          </label>
          <input
            type="text"
            placeholder="Search companies..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textBlue focus:border-transparent transition-all duration-200 shadow-sm text-font14 text-textBlack"
          />
        </div>

        {/* Filter by Location */}
        <div className="relative">
          <label className="block text-font14 font-medium text-textDark mb-2">
            <FaMapMarkerAlt className="inline mr-1" />
            Location
          </label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textBlue focus:border-transparent transition-all duration-200 shadow-sm bg-white text-font14 text-textBlack"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Filter by Industry */}
        <div className="relative">
          <label className="block text-font14 font-medium text-textDark mb-2">
            <FaIndustry className="inline mr-1" />
            Industry
          </label>
          <select
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-textBlue focus:border-transparent transition-all duration-200 shadow-sm bg-white text-font14 text-textBlack"
          >
            <option value="">All Industries</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="w-full px-3 py-2 bg-textDark text-white rounded-lg hover:bg-textBlack focus:outline-none focus:ring-2 focus:ring-textBlue transition-all duration-200 font-medium text-font14"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
