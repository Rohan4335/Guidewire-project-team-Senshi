
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import PolicyManagement from '../pages/PolicyManagement';
import Claims from '../pages/Claims';
import PremiumDetails from '../pages/PremiumDetails';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'policies',
        element: <PolicyManagement />,
      },
      {
        path: 'claims',
        element: <Claims />,
      },
      {
        path: 'premium',
        element: <PremiumDetails />,
      },
      {
        path: '',
        element: <Dashboard />,
      }
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
