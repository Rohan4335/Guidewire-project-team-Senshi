import React from 'react';

const PolicyManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Policy Management</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">View and manage your insurance policies here.</p>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">Auto Insurance</p>
              <p className="text-sm text-gray-500">Policy: #AI-987654</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
          </li>
          <li className="py-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">Home Insurance</p>
              <p className="text-sm text-gray-500">Policy: #HI-123456</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PolicyManagement;
