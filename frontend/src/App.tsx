import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import ServiceDetail from '@/pages/ServiceDetail';
import AccessDenied from '@/pages/AccessDenied';
import Dashboard from '@/pages/admin/Dashboard';
import Appointments from '@/pages/admin/Appointments';
import ContentManager from '@/pages/admin/ContentManager';
import DoctorScheduler from '@/pages/admin/DoctorScheduler';
import BeforeAfterManager from '@/pages/admin/BeforeAfterManager';
import ServiceManager from '@/pages/admin/ServiceManager';
import ReviewApprover from '@/pages/admin/ReviewApprover';
import DentalImplantsDetail from '@/pages/DentalImplantsDetail';
import InvisalignDetail from '@/pages/InvisalignDetail';
import LaserDentistryDetail from '@/pages/LaserDentistryDetail';
import PediatricDentistryDetail from '@/pages/PediatricDentistryDetail';
import SmileMakeoverDetail from '@/pages/SmileMakeoverDetail';
import AdminGuard from '@/components/AdminGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Layout with Header and Footer
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgressBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Admin layout (no public header/footer)
function AdminLayout() {
  return (
    <AdminGuard>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </AdminGuard>
  );
}

// Routes
const rootRoute = createRootRoute();

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

const pediatricDentistryRoute = createRoute({
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

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-layout',
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/dashboard',
  component: Dashboard,
});

const adminAppointmentsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/appointments',
  component: Appointments,
});

const adminContentRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/content',
  component: ContentManager,
});

const adminDoctorRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/doctors',
  component: DoctorScheduler,
});

const adminBeforeAfterRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/before-after',
  component: BeforeAfterManager,
});

const adminServiceManagerRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/service-manager',
  component: ServiceManager,
});

const adminReviewApproverRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/review-approver',
  component: ReviewApprover,
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    dentalImplantsRoute,
    invisalignRoute,
    laserDentistryRoute,
    pediatricDentistryRoute,
    smileMakeoverRoute,
    serviceDetailRoute,
  ]),
  accessDeniedRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminAppointmentsRoute,
    adminContentRoute,
    adminDoctorRoute,
    adminBeforeAfterRoute,
    adminServiceManagerRoute,
    adminReviewApproverRoute,
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
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
