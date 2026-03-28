import React from 'react';

const Claims: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Claims Center</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Track and file your insurance claims.</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">File New Claim</button>
        </div>
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 15, 2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Auto Accident</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending Review</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><button className="text-blue-600 hover:text-blue-900">View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Claims;
