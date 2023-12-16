import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import DashboardLayout from '../layouts/dashboard';
import LandingPage from '../pages/landing';
import LoadingView from '../sections/loading/loading';

export const MainPage = lazy(() => import('../pages/main'));
export const UserPage = lazy(() => import('../pages/user'));
export const CoursesPage = lazy(() => import('../pages/courses'));
export const PlansPage = lazy(() => import('../pages/plans'));
export const MailboxPage = lazy(() => import('../pages/mailbox'));
export const Page404 = lazy(() => import('../pages/page-not-found'));


export default function Router() {
  const { authUser } = useAuth();

  const routes = useRoutes([
    {
      element: (
        authUser.isAuthenticated ?
        <DashboardLayout>
          <Suspense fallback={<LoadingView />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        :  
        <LandingPage />
      ),
      children: [
        { element: <MainPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'plans', element: <PlansPage />},
        { path: 'mailbox', element: <MailboxPage />},
      ],
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
