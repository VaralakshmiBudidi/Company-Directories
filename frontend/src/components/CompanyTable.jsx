import {useState, useEffect} from 'react';
import { createPortal } from 'react-dom';
import CreateCompanyModal from './CreateCompanyModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useSelector, useDispatch } from 'react-redux';
import { sortByName, setPage, setPerPage, fetchCompanies, createCompany, updateCompany, deleteCompany } from '../services/apiSlice';
import Pagination from './Pagination';
import { FaBuilding, FaPlus, FaMapMarkerAlt, FaIndustry, FaSort, FaSortUp, FaSortDown, FaSearch, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

const CompanyTable = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('below');
  const [dropdownCoords, setDropdownCoords] = useState({ x: 0, y: 0 });
  const { filteredCompanies, sortAsc, currentPage, perPage, loading, error } = useSelector(state => state.company);

  // Fetch companies on component mount
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const startIndex = (currentPage - 1) * perPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + perPage);

  const totalPages = Math.ceil(filteredCompanies.length / perPage);

  const handleSort = () => {
    dispatch(sortByName());
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  const handlePerPageChange = (newPerPage) => {
    dispatch(setPerPage(parseInt(newPerPage)));
  };

  const getIndustryIcon = (industry) => {
    const iconMap = {
      'Software': '💻',
      'Environmental': '🌱',
      'Finance': '💰',
      'Healthcare': '🏥',
      'Automotive': '🚗'
    };
    return iconMap[industry] || '🏢';
  };

  const getIndustryColor = (industry) => {
    const colorMap = {
      'Software': 'bg-blue-100 text-blue-800',
      'Environmental': 'bg-green-100 text-green-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Automotive': 'bg-purple-100 text-purple-800'
    };
    return colorMap[industry] || 'bg-gray-100 text-gray-800';
  };

  const handleCreateCompany = async (companyData) => {
    try {
      if (isEditMode) {
        await dispatch(updateCompany({ 
          id: selectedCompany.id, 
          companyData 
        })).unwrap();
        // Refetch companies to ensure we have the latest data
        dispatch(fetchCompanies());
      } else {
        await dispatch(createCompany(companyData)).unwrap();
        // Refetch companies to ensure we have the latest data
        dispatch(fetchCompanies());
      }
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Error saving company:', error);
      // You could show a toast notification here
    }
  };

  const toggleDropdown = (companyId, event) => {
    if (activeDropdown === companyId) {
      setActiveDropdown(null);
    } else {
      // Check if dropdown should appear above or below
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Calculate position
      const x = rect.right - 192; // 192px is dropdown width (w-48)
      const y = spaceBelow < 100 && spaceAbove > spaceBelow 
        ? rect.top - 100 // Show above
        : rect.bottom + 8; // Show below
      
      setDropdownCoords({ x, y });
      
      // If there's not enough space below (less than 100px) and more space above, show above
      if (spaceBelow < 100 && spaceAbove > spaceBelow) {
        setDropdownPosition('above');
      } else {
        setDropdownPosition('below');
      }
      
      setActiveDropdown(companyId);
    }
  };

  const handleEdit = (company) => {
    setActiveDropdown(null);
    setSelectedCompany(company);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
    setActiveDropdown(null);
  };


  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteCompany(selectedCompany.id)).unwrap();
      // Refetch companies to ensure we have the latest data
      dispatch(fetchCompanies());
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    <div className='relative flex-1 bg-white rounded-lg shadow-sm' style={{backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
      {/* Compact Header - Side by side with Create button */}
      <div className="flex items-center justify-between mb-4 px-6 pt-4 border-b border-gray-200" style={{borderBottom: '1px solid #E5E7EB', padding: '16px 24px'}}>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <FaBuilding className="text-textBlue mr-2" style={{color: '#3B82F6', fontSize: '18px'}} />
            <h3 className="text-font16 font-semibold text-textBlack" style={{fontSize: '16px', fontWeight: '600', color: '#1F2937'}}>
              Companies ({filteredCompanies.length})
            </h3>
          </div>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm"
          >
            <FaPlus className="text-sm" />
            Create Company
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto" style={{ overflow: 'visible' }}>
        <table className="w-full border-collapse bg-white shadow-xl rounded-lg border-2 border-blue-300" style={{border: '2px solid #3B82F6', position: 'relative'}}>
          <thead className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100" style={{background: 'linear-gradient(to right, #DBEAFE, #E0E7FF, #F3E8FF)'}}>
            <tr className="h-[65px]">
              <th 
                scope="col" 
                className="text-font14 text-gray-800 font-bold px-6 py-4 text-left min-w-[250px] border-r border-blue-200 cursor-pointer hover:bg-blue-200 transition-all duration-300"
                onClick={handleSort}
              >
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-blue-600 text-lg" />
                  <span className="text-gray-800">Company Name</span>
                  <div className="ml-2">
                    {sortAsc ? <FaSortUp className="text-blue-600" /> : <FaSortDown className="text-blue-600" />}
                  </div>
                </div>
              </th>
              <th scope="col" className="text-font14 text-gray-800 font-bold px-6 py-4 text-left min-w-[200px] border-r border-blue-200">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600 text-lg" />
                  <span className="text-gray-800">Location</span>
                </div>
              </th>
              <th scope="col" className="text-font14 text-gray-800 font-bold px-6 py-4 text-left min-w-[200px]">
                <div className="flex items-center gap-2">
                  <FaIndustry className="text-blue-600 text-lg" />
                  <span className="text-gray-800">Industry</span>
                </div>
              </th>
              <th scope="col" className="text-font14 text-gray-800 font-bold px-6 py-4 text-center min-w-[100px]">
                <span className="text-gray-800">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-lg text-gray-600 font-medium mt-4">Loading companies...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <p className="text-lg text-red-600 font-medium">Error loading companies</p>
                    <p className="text-sm text-gray-500">{error}</p>
                  </div>
                </td>
              </tr>
            ) : paginatedCompanies.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <FaSearch className="text-4xl text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 font-medium">No companies found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedCompanies.map((company, index) => (
                <tr 
                  key={company.id} 
                  className={`h-[60px] border-b border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-3 border-r border-gray-200">
                      <div className="ml-2">
                        <div className="text-font14 font-bold text-gray-800">{company.name}</div>
                      </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <div className="flex items-center">
                      <span className="text-font14 text-gray-800 font-semibold">{company.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-font14 text-gray-800 font-semibold">
                        {company.industry}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center" style={{ position: 'relative' }}>
                    <div className="relative dropdown-container" style={{ position: 'relative', zIndex: 10 }}>
                      <button
                        onClick={(e) => toggleDropdown(company.id, e)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FaEllipsisV className="h-4 w-4" />
                      </button>
                      
                      {activeDropdown === company.id && (
                        <div 
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200"
                          style={{
                            zIndex: 9999,
                            minWidth: '12rem',
                            backgroundColor: 'white',
                            opacity: 1,
                            visibility: 'visible'
                          }}
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleEdit(company)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FaEdit className="h-4 w-4 mr-3 text-blue-600" />
                              Edit Company
                            </button>
                            <button
                              onClick={() => handleDelete(company)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <FaTrash className="h-4 w-4 mr-3 text-red-600" />
                              Delete Company
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 px-6 pb-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <div className="text-font14 text-textDark" style={{fontSize: '14px', color: '#6B7280'}}>
              Showing {perPage} per page
            </div>
            <select
              value={perPage}
              onChange={(e) => handlePerPageChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-font14"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          {/* Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />

          {/* Create/Edit Company Modal */}
          <CreateCompanyModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsEditMode(false);
              setSelectedCompany(null);
            }}
            onSubmit={handleCreateCompany}
            company={selectedCompany}
            isEditMode={isEditMode}
          />

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedCompany(null);
            }}
            onConfirm={handleDeleteConfirm}
            company={selectedCompany}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
