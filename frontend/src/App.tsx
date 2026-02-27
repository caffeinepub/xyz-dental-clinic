import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import AccessDenied from './pages/AccessDenied';
import ServiceDetail from './pages/ServiceDetail';
import DentalImplantsDetail from './pages/DentalImplantsDetail';
import InvisalignDetail from './pages/InvisalignDetail';
import LaserDentistryDetail from './pages/LaserDentistryDetail';
import PediatricDentistryDetail from './pages/PediatricDentistryDetail';
import SmileMakeoverDetail from './pages/SmileMakeoverDetail';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import ContentManager from './pages/admin/ContentManager';
import DoctorScheduler from './pages/admin/DoctorScheduler';
import ServiceManager from './pages/admin/ServiceManager';
import BeforeAfterManager from './pages/admin/BeforeAfterManager';
import ReviewApprover from './pages/admin/ReviewApprover';
import AdminGuard from './components/AdminGuard';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import LiquidGradientBackground from './components/LiquidGradientBackground';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <AdminGuard>
      <Outlet />
    </AdminGuard>
  );
}

const rootRoute = createRootRoute({ component: Outlet });

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Home,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const dentalImplantsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/dental-implants',
  component: DentalImplantsDetail,
});

const invisalignRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/invisalign',
  component: InvisalignDetail,
});

const laserDentistryRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/laser-dentistry',
  component: LaserDentistryDetail,
});

const pediatricRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/pediatric-dentistry',
  component: PediatricDentistryDetail,
});

const smileMakeoverRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/smile-makeover',
  component: SmileMakeoverDetail,
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/services/$serviceId',
  component: ServiceDetail,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/dashboard',
  component: Dashboard,
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/appointments',
  component: Appointments,
});

const adminContentRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/content',
  component: ContentManager,
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/doctors',
  component: DoctorScheduler,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/services',
  component: ServiceManager,
});

const adminBeforeAfterRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/before-after',
  component: BeforeAfterManager,
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/reviews',
  component: ReviewApprover,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    accessDeniedRoute,
    dentalImplantsRoute,
    invisalignRoute,
    laserDentistryRoute,
    pediatricRoute,
    smileMakeoverRoute,
    serviceDetailRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminAppointmentsRoute,
    adminContentRoute,
    adminDoctorsRoute,
    adminServicesRoute,
    adminBeforeAfterRoute,
    adminReviewsRoute,
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
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
