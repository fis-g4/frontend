import { lazy, Suspense } from 'react'
import { Outlet, Navigate, useRoutes } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'


import DashboardLayout from '../layouts/dashboard'
import LandingPage from '../pages/landing'
import LoadingView from '../sections/loading/loading'

export const MaterialDetailsPage = lazy(() => import('../pages/material-details'));
export const MaterialsPage = lazy(() => import('../pages/materials'));
export const HomePage = lazy(() => import('../pages/home'))
export const ProfilePage = lazy(() => import('../pages/profile'))
export const CoursesPage = lazy(() => import('../pages/courses'))
export const PlansPage = lazy(() => import('../pages/plans'))
export const MailboxPage = lazy(() => import('../pages/mailbox'))
export const SettingsPage = lazy(() => import('../pages/settings'))
export const Page404 = lazy(() => import('../pages/page-not-found'))
export const ContractPage = lazy(() => import('../pages/contract'))

export default function Router() {
    const { authUser } = useAuth()
    const routes = useRoutes([
    {
      element: (
        authUser.isLoading ?
        <LoadingView /> :
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
        { element: <></>, index: true },
        { path: 'me', element: <ProfilePage /> },
        { path: 'courses', element: <></> },
        { path: 'material/:id', element: <></> },
        { path: 'materials', element: <></>},
        { path: 'plans', element: <></>},
        { path: 'mailbox', element: <MailboxPage />},
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
    {
      path: 'error',
      element: <Page404 />,
    },
    { path: 'contract', element: <ContractPage /> },
    {
      path: '*',
      element: <Navigate to="/error" replace />,
    },
  ]);

    return routes
}
