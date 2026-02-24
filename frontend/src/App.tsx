import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Dashboard from './pages/admin/Dashboard';
import Appointments from './pages/admin/Appointments';
import ContentManager from './pages/admin/ContentManager';
import DoctorScheduler from './pages/admin/DoctorScheduler';
import AccessDenied from './pages/AccessDenied';
import AdminGuard from './components/AdminGuard';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfileSetup from './components/UserProfileSetup';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <UserProfileSetup />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$serviceId',
  component: ServiceDetail,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: () => (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  ),
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/appointments',
  component: () => (
    <AdminGuard>
      <Appointments />
    </AdminGuard>
  ),
});

const adminContentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/content',
  component: () => (
    <AdminGuard>
      <ContentManager />
    </AdminGuard>
  ),
});

const adminDoctorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/doctors',
  component: () => (
    <AdminGuard>
      <DoctorScheduler />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  serviceDetailRoute,
  accessDeniedRoute,
  adminDashboardRoute,
  adminAppointmentsRoute,
  adminContentRoute,
  adminDoctorsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
