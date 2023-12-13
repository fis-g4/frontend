import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import LandingPage from '../pages/landing';

export const MainPage = lazy(() => import('../pages/main'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const Page404 = lazy(() => import('../pages/page-not-found'));


const isAuth = true;
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        isAuth ?
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        :  
        <LandingPage />
      ),
      children: [
        { element: <MainPage />, index: true },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
        path: 'welcome',
        element: <LandingPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'error',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/error" replace />,
    },
  ]);

  return routes;
}
