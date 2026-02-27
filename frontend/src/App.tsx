import React from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import AccessDenied from './pages/AccessDenied';
import ServiceDetail from './pages/ServiceDetail';
import DentalImplantsDetail from './pages/DentalImplantsDetail';
import InvisalignDetail from './pages/InvisalignDetail';
import SmileMakeoverDetail from './pages/SmileMakeoverDetail';
import PediatricDentistryDetail from './pages/PediatricDentistryDetail';
import LaserDentistryDetail from './pages/LaserDentistryDetail';
import AdminGuard from './components/AdminGuard';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import ContentManager from './pages/admin/ContentManager';
import DoctorScheduler from './pages/admin/DoctorScheduler';
import ServiceManager from './pages/admin/ServiceManager';
import ReviewApprover from './pages/admin/ReviewApprover';
import BeforeAfterManager from './pages/admin/BeforeAfterManager';
import LiquidGradientBackground from './components/LiquidGradientBackground';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ClinicStatusBanner from './components/ClinicStatusBanner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

// Layout component for public pages
function PublicLayout() {
  return (
    <>
      <Header />
      <ClinicStatusBanner />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Wrapper so AdminGuard can be used as a route component (no children prop from router)
function AdminGuardWrapper() {
  return (
    <AdminGuard>
      <Outlet />
    </AdminGuard>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const dentalImplantsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/dental-implants',
  component: DentalImplantsDetail,
});

const invisalignRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/invisalign',
  component: InvisalignDetail,
});

const smileMakeoverRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/smile-makeover',
  component: SmileMakeoverDetail,
});

const pediatricRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/pediatric-dentistry',
  component: PediatricDentistryDetail,
});

const laserRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/laser-dentistry',
  component: LaserDentistryDetail,
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services/$serviceId',
  component: ServiceDetail,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

// Admin routes (no public layout, wrapped in AdminGuardWrapper)
const adminGuardRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-guard',
  component: AdminGuardWrapper,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/dashboard',
  component: Dashboard,
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/appointments',
  component: Appointments,
});

const adminContentRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/content',
  component: ContentManager,
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/doctors',
  component: DoctorScheduler,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/services',
  component: ServiceManager,
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/reviews',
  component: ReviewApprover,
});

const adminBeforeAfterRoute = createRoute({
  getParentRoute: () => adminGuardRoute,
  path: '/admin/before-after',
  component: BeforeAfterManager,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    dentalImplantsRoute,
    invisalignRoute,
    smileMakeoverRoute,
    pediatricRoute,
    laserRoute,
    serviceDetailRoute,
  ]),
  accessDeniedRoute,
  adminGuardRoute.addChildren([
    adminDashboardRoute,
    adminAppointmentsRoute,
    adminContentRoute,
    adminDoctorsRoute,
    adminServicesRoute,
    adminReviewsRoute,
    adminBeforeAfterRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LiquidGradientBackground />
        <ScrollProgressBar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
