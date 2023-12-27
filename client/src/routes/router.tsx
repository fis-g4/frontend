import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import DashboardLayout from '../layouts/dashboard';
import LandingPage from '../pages/landing';
import LoadingView from '../sections/loading/loading';

export const HomePage = lazy(() => import('../pages/home'));
export const ProfilePage = lazy(() => import('../pages/profile'));
export const CoursesPage = lazy(() => import('../pages/courses'));
export const MaterialDetailsPage = lazy(() => import('../pages/material-details'));
export const PlansPage = lazy(() => import('../pages/plans'));
export const MailboxPage = lazy(() => import('../pages/mailbox'));
export const SettingsPage = lazy(() => import('../pages/settings'));
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
        { element: <HomePage />, index: true },
        { path: 'me', element: <ProfilePage /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'material/:id', element: <MaterialDetailsPage /> },
        { path: 'plans', element: <PlansPage />},
        { path: 'mailbox', element: <MailboxPage />},
        { path: 'settings', element: <SettingsPage /> },
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
