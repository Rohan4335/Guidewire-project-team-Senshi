import React from 'react';

const PremiumDetails: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Premium Details</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Upcoming Payments</h3>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
          <div>
            <p className="font-semibold text-gray-800">Auto Insurance Premium</p>
            <p className="text-sm text-gray-500">Due Date: Nov 1, 2023</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-red-600">$125.00</p>
            <button className="mt-2 text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
