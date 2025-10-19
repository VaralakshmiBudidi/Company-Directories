import React, { useState } from 'react';
import FilterControls from './FilterControls';
import CompanyTable from './CompanyTable';

const CompanyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Table - Main Content */}
        <div className="flex-1 lg:w-3/4">
          <CompanyTable />
        </div>

        {/* Filter Controls - Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-4 lg:sticky lg:top-4">
            <FilterControls />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
