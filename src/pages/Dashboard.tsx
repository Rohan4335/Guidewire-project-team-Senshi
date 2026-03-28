import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
          <h3 className="text-xl font-semibold mb-2">Active Policies</h3>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-emerald-600">
          <h3 className="text-xl font-semibold mb-2">Pending Claims</h3>
          <p className="text-3xl font-bold text-emerald-600">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500">
          <h3 className="text-xl font-semibold mb-2">Upcoming Premium</h3>
          <p className="text-3xl font-bold text-amber-500">$250</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
