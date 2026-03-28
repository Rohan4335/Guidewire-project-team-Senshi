import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">GiGuard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
              <li><a href="/policies" className="text-blue-600 hover:underline">Policies</a></li>
              <li><a href="/claims" className="text-blue-600 hover:underline">Claims</a></li>
              <li><a href="/premium" className="text-blue-600 hover:underline">Premium</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
