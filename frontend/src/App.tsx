import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { CursorContextProvider } from '@/context/CursorContext';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ServiceDetail from '@/pages/ServiceDetail';
import DentalImplantsDetail from '@/pages/DentalImplantsDetail';
import InvisalignDetail from '@/pages/InvisalignDetail';
import PediatricDentistryDetail from '@/pages/PediatricDentistryDetail';
import SmileMakeoverDetail from '@/pages/SmileMakeoverDetail';
import LaserDentistryDetail from '@/pages/LaserDentistryDetail';
import AccessDenied from '@/pages/AccessDenied';
import AdminGuard from '@/components/AdminGuard';
import Dashboard from '@/pages/admin/Dashboard';
import Appointments from '@/pages/admin/Appointments';
import ContentManager from '@/pages/admin/ContentManager';
import DoctorScheduler from '@/pages/admin/DoctorScheduler';
import ServiceManager from '@/pages/admin/ServiceManager';
import ReviewApprover from '@/pages/admin/ReviewApprover';
import BeforeAfterManager from '@/pages/admin/BeforeAfterManager';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressBar />
      <CustomCursor />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <AdminGuard>
      <Outlet />
    </AdminGuard>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const dentalImplantsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/dental-implants', component: DentalImplantsDetail });
const invisalignRoute = createRoute({ getParentRoute: () => rootRoute, path: '/invisalign', component: InvisalignDetail });
const pediatricRoute = createRoute({ getParentRoute: () => rootRoute, path: '/pediatric-dentistry', component: PediatricDentistryDetail });
const smileMakeoverRoute = createRoute({ getParentRoute: () => rootRoute, path: '/smile-makeover', component: SmileMakeoverDetail });
const laserRoute = createRoute({ getParentRoute: () => rootRoute, path: '/laser-dentistry', component: LaserDentistryDetail });
const serviceDetailRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services/$serviceId', component: ServiceDetail });
const accessDeniedRoute = createRoute({ getParentRoute: () => rootRoute, path: '/access-denied', component: AccessDenied });

// Admin routes
const adminLayoutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: AdminLayout });
const adminDashboardRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/dashboard', component: Dashboard });
const adminAppointmentsRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/appointments', component: Appointments });
const adminContentRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/content-manager', component: ContentManager });
const adminDoctorRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/doctor-scheduler', component: DoctorScheduler });
const adminServiceManagerRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/service-manager', component: ServiceManager });
const adminReviewApproverRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/review-approver', component: ReviewApprover });
const adminBeforeAfterRoute = createRoute({ getParentRoute: () => adminLayoutRoute, path: '/before-after-manager', component: BeforeAfterManager });

const routeTree = rootRoute.addChildren([
  indexRoute,
  dentalImplantsRoute,
  invisalignRoute,
  pediatricRoute,
  smileMakeoverRoute,
  laserRoute,
  serviceDetailRoute,
  accessDeniedRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminAppointmentsRoute,
    adminContentRoute,
    adminDoctorRoute,
    adminServiceManagerRoute,
    adminReviewApproverRoute,
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
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <CursorContextProvider>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </CursorContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
